"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import type { TTab, TTabsProps } from "./tabs.type";
import css from "./tabs.module.css";


// HELPERS
// ----------------------------------------------------------------------------------------------------
function getColor(tab: TTab): string {
  return tab.color ?? "var(--palette-primary-main)";
}


export function Tabs({ tabs, value, onChange }: TTabsProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div className={css.tabs}>

      {tabs.map((tab) => {
        const active = tab.value === value;
        const color = getColor(tab);

        return (
          <button
            type="button"
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`${css.tab}${active ? ` ${css.active}` : ""}${tab.fullWidth ? ` ${css.fullWidth}` : ""}`}
            style={active ? { color, borderBottomColor: color } : undefined}
          >

            {tab.icon}

            <p>{tab.label}</p>

            {typeof tab.count === "number" && (
              <span
                className={css.label}
                style={active ? { color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` } : undefined}
              >
                {tab.count}
              </span>
            )}

          </button>
        );
      })}

    </div>

  );


}
