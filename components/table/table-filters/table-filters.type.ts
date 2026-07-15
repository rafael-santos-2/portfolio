// IMPORTS
// ----------------------------------------------------------------------------------------------------
import type { ReactNode } from "react";


// TYPES
// ----------------------------------------------------------------------------------------------------
export type TTableFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  components?: ReactNode;
};
