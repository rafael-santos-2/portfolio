"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useTranslate } from "@/providers/language/use-locales";
import type { TTableHeadProps } from "./table-head.type";
import css from "./table-head.module.css";


export function TableHeadCustom({ sx, order, onSort, orderBy, headCells, rowCount = 0, numSelected = 0, onSelectAllRows, endCell }: TTableHeadProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <TableHead className={css.head} sx={sx}>
      <TableRow>

        {onSelectAllRows && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={!!numSelected && numSelected < rowCount}
              checked={!!rowCount && numSelected === rowCount}
              onChange={(e) => onSelectAllRows(e.target.checked)}
              slotProps={{
                input: {
                  id: "all-row-checkbox",
                  "aria-label": t("components.table.selectAll"),
                }
              }}
            />
          </TableCell>
        )}

        {headCells.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.align ?? "left"}
            sortDirection={orderBy === cell.id ? order : false}
            sx={[{ width: cell.width }, ...(Array.isArray(cell.sx) ? cell.sx : [cell.sx])]}
          >
            {onSort && !cell.disableSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : "asc"}
                onClick={() => onSort(cell.id)}
              >
                {cell.label}
                {cell.headerAction && <span className={css["header-action"]}>{cell.headerAction}</span>}
                {orderBy === cell.id && (
                  <span className={css["visually-hidden"]}>
                    {order === "desc" ? t("components.table.sortedDescending") : t("components.table.sortedAscending")}
                  </span>
                )}
              </TableSortLabel>
            ) : (
              <>
                {cell.label}
                {cell.headerAction && <span className={css["header-action"]}>{cell.headerAction}</span>}
              </>
            )}
          </TableCell>
        ))}

        {endCell && (
          <TableCell align="right" padding="checkbox">{endCell}</TableCell>
        )}

      </TableRow>
    </TableHead>
  );


}
