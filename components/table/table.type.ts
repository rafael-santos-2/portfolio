// IMPORTS
// ----------------------------------------------------------------------------------------------------
import type { ReactNode } from "react";
import type { TUseTableReturn } from "@/hooks/use-table";
import type { TTab } from "@/components/tabs";
import { TTableHeadCell } from "./table-head/table-head.type";


// TYPES
// ----------------------------------------------------------------------------------------------------
export type TTableSelectionProps = {
  selected: boolean;
  onSelect: () => void;
};

export type TTableProps<T> = {

  id: string;
  table: TUseTableReturn;
  
  data: T[];
  totalCount: number;
  loading?: boolean;
  headCells: TTableHeadCell[];
  renderRow: (row: T, isVisible: (id: string) => boolean, selection?: TTableSelectionProps) => ReactNode;
  emptyText?: string;
  pagination?: boolean;
  selectable?: boolean;
  actions?: (selected: string[]) => ReactNode;
  tabs?: TTab[];
  tabValue?: string;
  onTabChange?: (value: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filterComponents?: ReactNode;
  onRowClick?: (row: T) => void;
  scrollRestore?: boolean;

};
