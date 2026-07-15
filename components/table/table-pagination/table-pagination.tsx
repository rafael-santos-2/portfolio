// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import { FormControlLabel, Switch, TablePagination as MuiTablePagination } from "@mui/material";
import { useTranslate } from "@/providers/language/use-locales";
import type { TTablePaginationProps } from "./table-pagination.type";
import css from "./table-pagination.module.css";
import { BREAKPOINT } from "@/config/app";
import { useApp } from "@/providers/app/context-app";


export function TablePagination({ count, table, rowsPerPageOptions = [5, 10, 25, 50, 100], showDenseToggle = true }: TTablePaginationProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const { screen_width } = useApp();
  const isMobile = screen_width <= BREAKPOINT


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div className={css.container}>

      <MuiTablePagination
        component="div"
        count={count}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        labelRowsPerPage={t("components.table.pagination.rowsPerPage")}
        labelDisplayedRows={({ from, to, count: c }) =>
          c !== -1
            ? t("components.table.pagination.displayedRows", { from, to, count: c })
            : t("components.table.pagination.displayedRowsUnknown", { from, to })
        }
        sx={{ borderTopColor: "transparent" }}
      />

      {showDenseToggle && !isMobile && (
        <FormControlLabel
          className={css["dense-toggle"]}
          label={t("components.table.pagination.denseToggle")}
          control={
            <Switch
              checked={table.dense}
              onChange={table.onToggleDense}
              slotProps={{ input: { id: "dense-switch" } }}
            />
          }
        />
      )}

    </div>
  );


}
