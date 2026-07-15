import { TPatchNote } from "@/types/app.type";

export const v1_1_0: TPatchNote = {
  version: "1.1.0",
  date: "2026-02-05",
  title: "Profile & Team Management",
  changes: [
    { category: "added", description: "Team overview page with user list" },
    { category: "added", description: "Password change section on profile page" },
    { category: "improved", description: "Avatar upload now supports drag and drop" },
    { category: "improved", description: "Navigation sidebar now highlights active route" },
    { category: "fixed", description: "Avatar not clearing after logout" },
    { category: "fixed", description: "Sign-in form not showing validation errors on submit" },
  ],
};
