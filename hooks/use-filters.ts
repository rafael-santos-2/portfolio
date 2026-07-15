"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSearchParams } from "@/utils/navigation";


// TYPES
// ----------------------------------------------------------------------------------------------------
const DEFAULT_DEBOUNCE_TIME = 500;
export type TUserFiltersSortDirection = "asc"|"desc";
export type TUseFiltersDefaults = { sort?:string , direction?:TUserFiltersSortDirection , page?:number , rows?:number ,[key:string]:unknown }
export type TUseTableFiltersReturn<T extends TUseFiltersDefaults> = {
  filters: T;
  changed: T;
  setFilter: {
    <K extends keyof T>(key: K, value: T[K]): void;
    (updates: Partial<T>): void;
  };
  resetFilters: () => void;
};


// HELPERS
// ----------------------------------------------------------------------------------------------------
function parse_filter_value(raw: string, key: string): unknown {
  if (key === "page" || key === "rows") return Number(raw);
  if (raw === "true" || raw === "false") return raw === "true";
  if (/^\d{4}-\d{2}-\d{2}(T[\d:.Z+-]*)?$/.test(raw)) {
    const date = new Date(raw);
    if (!isNaN(date.getTime())) return date;
  }
  return raw;
}
// ----------------------------------------------------------------------------------------------------


// HOOK
// ----------------------------------------------------------------------------------------------------
export function useFilters<T extends TUseFiltersDefaults>(defaults: T , in_url=true):TUseTableFiltersReturn<T> {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const ROUTER = useRouter();
  const DEBOUNCE = useRef<NodeJS.Timeout>(null);
  const SEARCHPARAMS = useSearchParams();
  const defaultsRef = useRef(defaults);
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [filters, setFilters] = useState<T>(() => {

    const initial = { ...defaults };

    if( in_url ){

      SEARCHPARAMS.forEach((raw, key) => {
        (initial as Record<string, unknown>)[key] = parse_filter_value(raw, key);
      });

    }

    return initial;

  });
  const [changed, set_changed] = useState<T>(filters);
  // ----------------------------------------------------------------------------------------------------



  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const setFilter = useCallback((keyOrUpdates: keyof T | Partial<T>, value?: T[keyof T]) => {

    // Cancel prev timeout
    if (DEBOUNCE.current) clearTimeout(DEBOUNCE.current);

    // Params
    const updates: Partial<T> = typeof keyOrUpdates === "object" ? keyOrUpdates : { [keyOrUpdates]: value } as Partial<T>;

    // Reset page to 0 unless page itself is being set
    const isPageUpdate = "page" in updates;
    const finalUpdates = isPageUpdate ? updates : { ...updates, page: 0 } as Partial<T>;

    // State
    setFilters(f => ({ ...f, ...finalUpdates }));

    // URL params
    if( in_url ){ updateSearchParams(SEARCHPARAMS, finalUpdates as Record<string, unknown>, ROUTER); }

    // Create debounce for changes to apply
    DEBOUNCE.current = setTimeout(() => set_changed(f => ({ ...f, ...finalUpdates })), "search" in updates ? DEFAULT_DEBOUNCE_TIME : 0);

  }, [ROUTER, SEARCHPARAMS, in_url]) as TUseTableFiltersReturn<T>["setFilter"];

  const resetFilters = useCallback(() => {

    setFilters(defaultsRef.current);
    const resetValues: Record<string, null> = {};
    Object.keys(defaultsRef.current).forEach((key) => { resetValues[key] = null; });
    updateSearchParams(SEARCHPARAMS, resetValues, ROUTER);

  }, [ROUTER, SEARCHPARAMS]);
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return { filters, changed, setFilter, resetFilters };
  // ----------------------------------------------------------------------------------------------------


}
