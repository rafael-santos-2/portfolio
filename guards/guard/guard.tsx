"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { IGuard } from "./guard.type";
import { useAuthContext } from "@/providers/authentication/context-authentication";
import { Loader } from '@/components/loader';
import ViewNotAuthenticated from "@/views/general/not-authenticated/view-not-authenticated";
import ViewNoPermission from "@/views/general/no-permission/view-no-permission";
// ----------------------------------------------------------------------------------------------------


export function Guard({ children, auth, roles, ids }: IGuard) {

  const { is_authenticated, is_initialized, user } = useAuthContext();

  // Still loading auth state
  if (!is_initialized) return <Loader />;

  // Must be logged in
  if (auth && !is_authenticated) return <ViewNotAuthenticated />;

  if (is_authenticated && user) {

    // Disabled/Deleted accounts are always blocked
    if (user.is_disabled || user.is_deleted) return <ViewNoPermission />;

    // Developer bypasses all further checks
    if (user.role !== "Developer") {

      // Must match one of the allowed role entries
      if (roles && roles.length > 0) {
        const matchingEntry = roles.find((entry) => entry.role === user.role);
        if (!matchingEntry) return <ViewNoPermission />;

        // If the matching role has type restrictions, user's type must be included
        if (matchingEntry.types && matchingEntry.types.length > 0 && !matchingEntry.types.includes(user.type!)) {
          return <ViewNoPermission />;
        }
      }

      // Must be in the allowed ID list
      if (ids && ids.length > 0 && !ids.includes(user.id)) {
        return <ViewNoPermission />;
      }

    }

  }

  return <>{children}</>;

}
