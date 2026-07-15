import { TPatchNote } from "@/types/app.type";

export const v1_3_0: TPatchNote = {
  version: "1.3.0",
  date: "2026-03-15",
  changes: [
    { category: "added", description: "Patch notes page" },
    { category: "added", description: "Empty state view with default illustration" },
    { category: "added", description: "Under construction placeholder view" },
    { category: "improved", description: "Snackbar positioning and close button styling" },
    { category: "improved", description: "All icon components now accept className prop" },
    { category: "performance", description: "Optimized Firestore queries with composite indexes" },
    { category: "security", description: "Added rate limiting on API routes" },
    { category: "removed", description: "Unused user type field from database schema" },
    { category: "removed", description: "Deprecated helper functions from utils" },
  ],
};
