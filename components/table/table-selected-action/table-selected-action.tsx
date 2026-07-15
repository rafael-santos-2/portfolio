// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { useTranslate } from "@/providers/language/use-locales";
import type { TTableSelectedActionProps } from "./table-selected-action.type";
import css from "./table-selected-action.module.css";


export function TableSelectedAction({ rowCount, numSelected, dense, onSelectAllRows, action }: TTableSelectedActionProps): JSX.Element | null {


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
  if (!numSelected) return null;

  return (
    <Box
      className={`${css.container}${dense ? ` ${css.dense}` : ""}`}
      sx={{ bgcolor: "background.paper" }}
    >

      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(e) => onSelectAllRows(e.target.checked)}
        inputProps={{ "aria-label": "Deselect all" }}
      />

      <Typography variant="subtitle2" color="primary" className={css.count}>
        {t("components.table.selected", { count: numSelected })}
      </Typography>

      {action && (
        <div className={css.actions}>
          {action}
        </div>
      )}

    </Box>
  );


}
