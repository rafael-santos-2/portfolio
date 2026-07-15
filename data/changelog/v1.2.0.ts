import { TPatchNote } from "@/types/app.type";

export const v1_2_0: TPatchNote = {
  version: "1.2.0",
  date: "2026-02-28",
  title: "Settings & Permissions",
  changes: [
    { category: "added", description: "Settings page with tab navigation" },
    { category: "added", description: "Role-based permission system in auth guard" },
    { category: "added", description: "No permission view for unauthorized access" },
    { category: "improved", description: "Header component now supports icon and mixed action types" },
    { category: "improved", description: "Popover widget extracted as reusable component" },
    { category: "fixed", description: "React 19 setState warnings in upload components" },
    { category: "fixed", description: "CSS caching issues with Turbopack" },
    { category: "deprecated", description: "Legacy theme toggle will be removed in v2.0.0" },
    { category: "removed", description: "Legacy theme toggle from navigation footer" },
  ],
};
