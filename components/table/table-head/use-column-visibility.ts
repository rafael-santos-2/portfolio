"use client";

import { useState, useEffect, useCallback } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import type { TTableHeadCell } from "./table-head.type";

export type TUseColumnVisibilityReturn = {
  allCells: TTableHeadCell[];
  visibleCells: TTableHeadCell[];
  isVisible: (id: string) => boolean;
  toggleColumn: (id: string) => void;
};

export function useColumnVisibility(allCells: TTableHeadCell[], listId: string): TUseColumnVisibilityReturn {
  const storageKey = `table-columns-${listId}`;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [hiddenIds, setHiddenIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hiddenIds));
  }, [hiddenIds, storageKey]);

  const toggleColumn = useCallback((id: string) => {
    const cell = allCells.find((c) => c.id === id);
    if (cell?.required) return;
    setHiddenIds((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));
  }, [allCells]);

  const isVisible = useCallback((id: string) => {
    const cell = allCells.find((c) => c.id === id);
    if (!cell) return false;
    if (isMobile && cell.hideOnMobile) return false;
    return !hiddenIds.includes(id);
  }, [allCells, hiddenIds, isMobile]);

  const visibleCells = allCells.filter((c) => isVisible(c.id));

  return { allCells, visibleCells, isVisible, toggleColumn };
}
