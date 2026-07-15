"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from "react";
import { Checkbox, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IconButton } from "@/components/buttons/icon-button/icon-button";
import Icon from "@/components/icon";
import { useTranslate } from "@/providers/language/use-locales";
import type { TColumnVisibilityButtonProps } from "./column-visibility-button.type";
import css from "./column-visibility-button.module.css";


export function ColumnVisibilityButton({ allCells, isVisible, toggleColumn }: TColumnVisibilityButtonProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <>
      <IconButton size="small" tooltip={t("components.table.manageColumns")} onClick={(e) => setAnchor(e.currentTarget)}>
        <Icon name="columns" size={18} />
      </IconButton>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { className: css.paper } }}
      >
        <Typography variant="subtitle2" className={css.title}>{t("components.table.columns")}</Typography>
        {allCells.filter((c) => c.label && !(isMobile && c.hideOnMobile)).map((cell) => (
          <MenuItem key={cell.id} disabled={cell.required} onClick={() => toggleColumn(cell.id)}>
            <ListItemIcon>
              <Checkbox size="small" checked={isVisible(cell.id)} disableRipple tabIndex={-1} />
            </ListItemIcon>
            <ListItemText primary={cell.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );


}
