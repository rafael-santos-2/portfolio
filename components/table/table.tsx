"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useEffect } from "react";
import { Table as MuiTable, TableBody, TableCell, TableRow } from "@mui/material";
import { useScrollRestore } from "@/hooks/use-scroll-restore";
import { TableHeadCustom } from "@/components/table/table-head/table-head";
import { useColumnVisibility } from "@/components/table/table-head/use-column-visibility";
import { ColumnVisibilityButton } from "@/components/table/table-head/column-visibility/column-visibility-button";
import { TableNoData } from "@/components/table/table-no-data/table-no-data";
import { TablePagination } from "@/components/table/table-pagination/table-pagination";
import { TableSkeleton } from "@/components/table/table-skeleton/table-skeleton";
import { TableSelectedAction } from "@/components/table/table-selected-action/table-selected-action";
import { TableFilters } from "@/components/table/table-filters/table-filters";
import { Tabs } from "@/components/tabs";
import type { TTableProps } from "./table.type";
import css from "./table.module.css";


export function Table<T extends { id: string }>({ id, table, data, totalCount, loading, headCells, renderRow, emptyText, pagination = true, selectable, actions, tabs, tabValue, onTabChange, search, onSearchChange, searchPlaceholder, filterComponents, onRowClick, scrollRestore }: TTableProps<T>): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const COLUMNS = useColumnVisibility(headCells, id);
  const { REF_SCROLL, saveScroll } = useScrollRestore(id, scrollRestore);

  // Scroll terug naar top bij pagina-wissel
  useEffect(() => {
    REF_SCROLL.current?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [ table.page, table.rowsPerPage, REF_SCROLL ]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div className={css.container}>

      {onSearchChange && (
        <TableFilters
          search={search ?? ""}
          onSearchChange={onSearchChange}
          placeholder={searchPlaceholder}
          components={filterComponents}
        />
      )}

      {tabs && onTabChange && (
        <Tabs tabs={tabs} value={tabValue ?? ""} onChange={onTabChange} />
      )}

      <div ref={REF_SCROLL} className={`${css.tableWrapper}${loading ? ` ${css.loading}` : ""}`}>

        {selectable && (
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={totalCount}
            onSelectAllRows={(checked) => table.onSelectAllRows(checked, data.map((r) => r.id))}
            action={actions?.(table.selected)}
          />
        )}

        <MuiTable size={table.dense ? "small" : "medium"} stickyHeader>
          <TableHeadCustom
            order={table.order}
            orderBy={table.orderBy}
            onSort={table.onSort}
            headCells={COLUMNS.visibleCells}
            numSelected={selectable ? table.selected.length : undefined}
            rowCount={selectable ? totalCount : undefined}
            onSelectAllRows={selectable ? (checked) => table.onSelectAllRows(checked, data.map((r) => r.id)) : undefined}
            endCell={
              <ColumnVisibilityButton
                allCells={COLUMNS.allCells}
                isVisible={COLUMNS.isVisible}
                toggleColumn={COLUMNS.toggleColumn}
              />
            }
          />
          <TableBody>
            {loading
              ? <TableSkeleton rowCount={table.rowsPerPage} cellCount={COLUMNS.visibleCells.length} />
              : data.map((row) => (
                <TableRow key={row.id} hover={!!onRowClick} onClick={onRowClick ? () => { saveScroll(); onRowClick(row); } : undefined} sx={onRowClick ? { cursor: "pointer", whiteSpace: "nowrap" } : { whiteSpace: "nowrap" }}>
                  {renderRow(
                    row,
                    COLUMNS.isVisible,
                    selectable ? { selected: table.selected.includes(row.id), onSelect: () => table.onSelectRow(row.id) } : undefined
                  )}
                  <TableCell padding="checkbox" />
                </TableRow>
              ))
            }
            <TableNoData notFound={!loading && !data.length} title={emptyText} />
          </TableBody>
        </MuiTable>
      </div>

      {pagination && (
        <TablePagination count={totalCount} table={table} />
      )}

    </div>
  );


}
