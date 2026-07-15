import { IUser } from "@/types/database";

export function formatUsername(user: IUser|null): string {
  if (!user) return "";
  
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  
  return `${firstName} ${lastName}`.trim();
}


export function formatInitials(user: IUser): string {
  if (!user) return "U";
  
  const firstInitial = user.firstName?.charAt(0).toUpperCase() || "U";
  const lastInitial = user.lastName?.charAt(0).toUpperCase() || "";
  
  return `${firstInitial}${lastInitial}`;
}