import { TPatchNote } from "@/types/app.type";

export const v1_3_1: TPatchNote = {
  version: "1.3.1",
  date: "2026-03-23",
  changes: [
    { category: "fixed", description: "Navigation tabs not showing active state on click" },
    { category: "fixed", description: "Dutch translations missing for password section" },
    { category: "improved", description: "Navigation tabs now use Next.js Link for prefetching" },
    { category: "performance", description: "Reduced bundle size by tree-shaking unused MUI components" },
    { category: "security", description: "Sanitized user input in profile update API" },
  ],
};
