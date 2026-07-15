import { TPatchNote } from "@/types/app.type";

export const v1_0_0: TPatchNote = {
  version: "1.0.0",
  date: "2026-01-10",
  title: "Initial Release",
  changes: [
    { category: "added", description: "Authentication system with sign-in and forgot password" },
    { category: "added", description: "Platform layout with sidebar navigation" },
    { category: "added", description: "User profile page with avatar upload" },
    { category: "added", description: "Multi-language support (EN / NL)" },
    { category: "added", description: "Theme provider with light and dark mode" },
  ],
};
