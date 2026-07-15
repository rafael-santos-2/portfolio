"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { usePathname } from "next/navigation";
import css from "./navigation-tabs.module.css";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { INavigationTabsProps } from "./navigation-tabs.type";


export default function NavigationTabs({ tabs, replace }: INavigationTabsProps) {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const PATHNAME = usePathname();
  const TAB_REFS = useRef<(HTMLAnchorElement | null)[]>([]);


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function get_active_path(): string | null {
    if (tabs.some((t) => t.path === PATHNAME)) return PATHNAME;
    const parent = PATHNAME.slice(0, PATHNAME.lastIndexOf("/"));
    if (tabs.some((t) => t.path === parent)) return parent;
    return tabs[0]?.path ?? null;
  }

  function is_active(path: string): boolean {
    return get_active_path() === path;
  }

  function get_color(color?: string): string {
    return color ?? "var(--palette-primary-main)";
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    const index = tabs.findIndex((tab) => is_active(tab.path));
    if (index !== -1) {
      TAB_REFS.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PATHNAME]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div className={css["navigation-tabs"]}>
      {tabs.map((tab, idx) => {
        const active = is_active(tab.path);
        const color = get_color(tab.color);

        return (
          <Link
            ref={(el) => { TAB_REFS.current[idx] = el; }}
            className={[css.tab, active ? css.active : ""].join(" ")}
            key={tab.path}
            href={tab.path}
            replace={replace}
            style={active ? { color, borderBottomColor: color } : undefined}
          >
            {tab.icon}
            <p>{tab.title}</p>
            {tab.label && (
              <span className={css.label} style={{ color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}>
                {tab.label}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );


}
