import { TPatchNote } from "@/types/app.type";

export const v2_0_0: TPatchNote = {
  version: "2.0.0",
  date: "2026-03-23",
  title: "Next.js 16 & React 19",
  changes: [
    { category: "breaking", description: "Upgraded to Next.js 16 — requires Node.js 20+" },
    { category: "breaking", description: "Upgraded to React 19 — class components no longer supported" },
    { category: "breaking", description: "Dropped support for legacy authentication flow" },
    { category: "added", description: "Changelog page with categorized patch notes" },
    { category: "added", description: "Navigation tabs widget with Link prefetching" },
    { category: "improved", description: "Authentication provider now uses real-time streaming" },
    { category: "security", description: "API routes now validate Bearer tokens server-side" },
    { category: "performance", description: "Switched to Turbopack for faster dev builds" },
    { category: "deprecated", description: "get_user function — use stream_user instead" },
    { category: "fixed", description: "Multiple React 19 strict mode warnings resolved" },
    { category: "removed", description: "Legacy get_user function from database utils" },
  ],
};
