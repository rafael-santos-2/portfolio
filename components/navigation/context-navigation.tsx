"use client";

import { createContext, useContext, useState, useMemo, useCallback, useRef } from "react";
import { TNavigationAction, TNavigationConfig } from "@/config/navigation";

interface IActiveParentItem {
  label: string;
  icon: React.ReactNode;
  actions?: TNavigationAction[];
}

interface INavigationContext {
  activeSubNavigation: TNavigationConfig | null;
  activeParentItem: IActiveParentItem | null;
  setActiveSubNavigation: (config: TNavigationConfig | null, parentItem?: IActiveParentItem) => void;
  isMainExpanded: boolean;
  toggleMainExpanded: () => void;
  isSubExpanded: boolean;
  toggleSubExpanded: () => void;
}

const NavigationContext = createContext<INavigationContext>({
  activeSubNavigation: null,
  activeParentItem: null,
  setActiveSubNavigation: () => {},
  isMainExpanded: true,
  toggleMainExpanded: () => {},
  isSubExpanded: true,
  toggleSubExpanded: () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeSubNavigation, setActiveSubNavigationState] = useState<TNavigationConfig | null>(null);
  const [activeParentItem, setActiveParentItem] = useState<IActiveParentItem | null>(null);
  const [isMainExpanded, setIsMainExpanded] = useState(true);
  const [isSubExpanded, setIsSubExpanded] = useState(true);
  const prevHadSubNav = useRef(false);

  const setActiveSubNavigation = useCallback((config: TNavigationConfig | null, parentItem?: IActiveParentItem) => {
    setActiveSubNavigationState(config);
    setActiveParentItem(parentItem ?? null);
    if (config && !prevHadSubNav.current) {
      setIsMainExpanded(false);
    } else if (!config && prevHadSubNav.current) {
      setIsMainExpanded(true);
    }
    prevHadSubNav.current = !!config;
  }, []);

  const toggleMainExpanded = useCallback(() => {
    setIsMainExpanded(prev => !prev);
  }, []);

  const toggleSubExpanded = useCallback(() => {
    setIsSubExpanded(prev => !prev);
  }, []);

  const value = useMemo(() => ({
    activeSubNavigation,
    activeParentItem,
    setActiveSubNavigation,
    isMainExpanded,
    toggleMainExpanded,
    isSubExpanded,
    toggleSubExpanded,
  }), [activeSubNavigation, activeParentItem, setActiveSubNavigation, isMainExpanded, toggleMainExpanded, isSubExpanded, toggleSubExpanded]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  return useContext(NavigationContext);
}
