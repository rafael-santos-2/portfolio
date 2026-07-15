import { TUserRole, TUserType } from "@/types/database";

export interface IGuardRole {
  role: TUserRole;
  /** If provided, user must also have one of these types within the role. */
  types?: TUserType[];
}

export interface IGuard {

  children: React.ReactNode;

  /** If true, the user must be authenticated. */
  auth?: boolean;

  /** User must match one of these role (+ optional type) entries. Developer always bypasses. */
  roles?: IGuardRole[];

  /** User's id must be in this array to continue. */
  ids?: string[];

}
