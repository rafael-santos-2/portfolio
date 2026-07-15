import type { IFirestoreDefault } from "./default.type";
import { FIRESTORE_DEFAULT } from "./default.type";


// ------------------------------------------------------------------------------
export interface IUser extends IFirestoreDefault {

  role: TUserRole;
  type?: TUserType;
  firstName: string;
  fullname?: string;
  lastName: string;
  email: string;
  path_avatar: File | string | null;
  is_disabled: boolean;
  date_disabled: Date | null;
  last_seen_version: string | null;

}
// ------------------------------------------------------------------------------


// ------------------------------------------------------------------------------
export type TUserType = "";
export type TUserRole = "Developer"|"Admin";
// ------------------------------------------------------------------------------


// DEFAULTS
// ------------------------------------------------------------------------------
export const USER_ROLES: Array<{ label: TUserRole, value: TUserRole, color: string }> = [
  {  label: "Developer", value: "Developer", color: "secondary" },
  {  label: "Admin", value: "Admin", color: "error" },
]

export const USER_DEFAULT: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  role: "Admin",
  path_avatar: null,
  is_disabled: false,
  date_disabled: null,
  last_seen_version: null,
  ...FIRESTORE_DEFAULT
}
// ------------------------------------------------------------------------------
