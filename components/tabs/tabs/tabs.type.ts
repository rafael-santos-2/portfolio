// IMPORTS
// ----------------------------------------------------------------------------------------------------
import type { ReactNode } from "react";


// TYPES
// ----------------------------------------------------------------------------------------------------
export type TTab = {
  value: string;
  label: string;
  count?: number;
  color?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
};

export type TTabsProps = {
  tabs: TTab[];
  value: string;
  onChange: (value: string) => void;
};
