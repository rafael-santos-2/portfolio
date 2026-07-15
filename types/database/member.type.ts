import { FIRESTORE_DEFAULT, IFirestoreDefault } from "./firestore-default.type";


// ------------------------------------------------------------------------------
export type TMemberRole = "Admin" | "Editor" | "Viewer";

export interface IMember extends IFirestoreDefault {
  firstName: string;
  lastName: string;
  email: string;
  role: TMemberRole;
  is_active: boolean;
}
// ------------------------------------------------------------------------------


// ------------------------------------------------------------------------------
export const MEMBER_ROLES: Array<{ label: TMemberRole; value: TMemberRole }> = [
  { label: "Admin", value: "Admin" },
  { label: "Editor", value: "Editor" },
  { label: "Viewer", value: "Viewer" },
];

export const MEMBER_DEFAULT: IMember = {
  firstName: "",
  lastName: "",
  email: "",
  role: "Viewer",
  is_active: true,
  ...FIRESTORE_DEFAULT,
};
// ------------------------------------------------------------------------------
