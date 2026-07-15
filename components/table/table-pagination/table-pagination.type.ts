import type { TUseTableReturn } from "@/hooks/use-table";

export type TTablePaginationProps = {
  count: number;
  table: Pick<TUseTableReturn, "page" | "rowsPerPage" | "dense" | "onChangePage" | "onChangeRowsPerPage" | "onToggleDense">;
  rowsPerPageOptions?: number[];
  showDenseToggle?: boolean;
};
