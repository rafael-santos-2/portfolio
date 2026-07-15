import { useState, useCallback, useRef, useEffect } from "react";


// TYPES
// ----------------------------------------------------------------------------------------------------

export type TTableOrder = "asc" | "desc";

export type TUseTableProps = {
  defaultOrder?: TTableOrder;
  defaultOrderBy?: string;
  defaultPage?: number;
  defaultRowsPerPage?: number;
  defaultDense?: boolean;
  defaultSelected?: string[];
  onSort?: (column: string, order: TTableOrder) => void;
  onPage?: (page: number, rowsPerPage: number) => void;
};

export type TUseTableReturn = {
  // State
  order: TTableOrder;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  dense: boolean;
  selected: string[];
  // Sorting
  onSort: (column: string) => void;
  // Pagination
  onChangePage: (event: unknown, page: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetPage: () => void;
  // Selection
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, ids: string[]) => void;
  onClearSelected: () => void;
  // Dense
  onToggleDense: () => void;
  // Page correction after delete
  onPageAfterDelete: (remainingInPage: number) => void;
  onPageAfterDeleteMany: (remainingInPage: number, totalFiltered: number) => void;
  // Setters
  setOrder: React.Dispatch<React.SetStateAction<TTableOrder>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};


// HOOK
// ----------------------------------------------------------------------------------------------------

export function useTable(props?: TUseTableProps): TUseTableReturn {

  const [order, setOrder] = useState<TTableOrder>(props?.defaultOrder ?? "asc");
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy ?? "name");
  const [page, setPage] = useState(props?.defaultPage ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage ?? 25);
  const [dense, setDense] = useState(props?.defaultDense ?? false);
  const [selected, setSelected] = useState<string[]>(props?.defaultSelected ?? []);

  // Mirror the latest prop callbacks into refs so the memoized handlers stay
  // stable without listing the (possibly inline) callbacks as dependencies.
  const onSortRef = useRef(props?.onSort);
  const onPageRef = useRef(props?.onPage);
  useEffect(() => { onSortRef.current = props?.onSort; onPageRef.current = props?.onPage; });


  // SORTING
  // ----------------------------------------------------------------------------------------------------

  const onSort = useCallback((column: string) => {

    const newOrder = orderBy === column && order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(column);
    setPage(0);
    onSortRef.current?.(column, newOrder);

  }, [order, orderBy]);


  // PAGINATION
  // ----------------------------------------------------------------------------------------------------

  const onChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
    onPageRef.current?.(newPage, rowsPerPage);
  }, [rowsPerPage]);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(event.target.value, 10);
    setRowsPerPage(newRows);
    setPage(0);
    onPageRef.current?.(0, newRows);
  }, []);

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);


  // SELECTION
  // ----------------------------------------------------------------------------------------------------

  const onSelectRow = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }, []);

  const onSelectAllRows = useCallback((checked: boolean, ids: string[]) => {
    setSelected(checked ? ids : []);
  }, []);

  const onClearSelected = useCallback(() => {
    setSelected([]);
  }, []);


  // DENSE
  // ----------------------------------------------------------------------------------------------------

  const onToggleDense = useCallback(() => {
    setDense((prev) => !prev);
  }, []);


  // PAGE CORRECTION AFTER DELETE
  // ----------------------------------------------------------------------------------------------------

  const onPageAfterDelete = useCallback((remainingInPage: number) => {
    setSelected([]);
    if (page > 0 && remainingInPage < 2) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const onPageAfterDeleteMany = useCallback((remainingInPage: number, totalFiltered: number) => {
    const count = selected.length;
    setSelected([]);

    if (page === 0) return;

    if (count === remainingInPage) {
      setPage((prev) => prev - 1);
    } else if (count === totalFiltered) {
      setPage(0);
    } else if (count > remainingInPage) {
      setPage(Math.max(0, Math.ceil((totalFiltered - count) / rowsPerPage) - 1));
    }
  }, [page, rowsPerPage, selected.length]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return {
    order, orderBy, page, rowsPerPage, dense, selected,
    onSort,
    onChangePage, onChangeRowsPerPage, onResetPage,
    onSelectRow, onSelectAllRows, onClearSelected,
    onToggleDense,
    onPageAfterDelete, onPageAfterDeleteMany,
    setOrder, setOrderBy, setPage, setRowsPerPage, setDense, setSelected,
  };
}
