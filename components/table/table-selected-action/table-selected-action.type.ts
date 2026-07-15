// IMPORTS
// ----------------------------------------------------------------------------------------------------
import type { ReactNode } from "react";


// TYPES
// ----------------------------------------------------------------------------------------------------
export type TTableSelectedActionProps = {
  rowCount: number;
  numSelected: number;
  dense?: boolean;
  onSelectAllRows: (checked: boolean) => void;
  action?: ReactNode;
};
