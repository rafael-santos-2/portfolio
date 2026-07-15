"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { useEffect, useRef, useCallback } from "react";


// HOOK
// ----------------------------------------------------------------------------------------------------
export function useScrollRestore(listId: string, enabled: boolean = true): {
  REF_SCROLL: React.RefObject<HTMLDivElement | null>;
  saveScroll: () => void;
} {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const STORAGE_KEY = `scroll-pos-${listId}`;
  const REF_SCROLL = useRef<HTMLDivElement | null>(null);
  const REF_RESTORED = useRef(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const saveScroll = useCallback(() => {
    if (!enabled) return;
    const el = REF_SCROLL.current;
    if (!el) return;
    sessionStorage.setItem(STORAGE_KEY, String(el.scrollTop));
  }, [enabled, STORAGE_KEY]);


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  // Herstel scroll bij mount
  useEffect(() => {

    if (!enabled) return;
    if (REF_RESTORED.current) return;

    const el = REF_SCROLL.current;
    if (!el) return;

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    // Gebruik requestAnimationFrame zodat de DOM volledig gerenderd is
    const frame = requestAnimationFrame(() => {
      if (REF_SCROLL.current) {
        REF_SCROLL.current.scrollTop = parseInt(stored, 10);
      }
      REF_RESTORED.current = true;
      sessionStorage.removeItem(STORAGE_KEY);
    });

    return () => cancelAnimationFrame(frame);
  },[REF_SCROLL,REF_RESTORED,enabled,STORAGE_KEY]);

  // Sla scroll op bij unmount als fallback (bv. browser back zonder expliciete save)
  useEffect(() => {

    if (!enabled) return;

    return () => {

      // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally reads the scroll position at unmount, not at effect setup
      const el = REF_SCROLL.current;
      if (!el) return;

      if (el.scrollTop > 0) {

        sessionStorage.setItem(STORAGE_KEY, String(el.scrollTop));
      }

    };

  }, [enabled, STORAGE_KEY , REF_SCROLL]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return { REF_SCROLL, saveScroll };


}
