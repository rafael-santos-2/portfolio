// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { useTranslate } from "@/providers/language/use-locales";
import type { TTableNoDataProps } from "./table-no-data.type";
import css from "./table-no-data.module.css";
import Icon from "@/components/icon";


export function TableNoData({ notFound, title, description }: TTableNoDataProps): JSX.Element | null {


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
  if (!notFound) return null;

  return (
    <TableRow>
      <TableCell colSpan={999} className={css.cell}>
        <div className={css.container}>
          <Icon name="search-remove" className={css.icon} size={60} />
          <Typography variant="subtitle1" className={css.title}>
            {title ?? t("components.table.noData")}
          </Typography>
          {description && (
            <Typography variant="body2" className={css.description}>{description}</Typography>
          )}
        </div>
      </TableCell>
    </TableRow>
  );


}
