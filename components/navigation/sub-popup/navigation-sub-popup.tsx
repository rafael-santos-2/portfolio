// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useRef, useState } from "react";
import css from "./navigation-sub-popup.module.css";
import { INavigationSubPopupProps } from "./navigation-sub-popup.type";
import NavigationItem from "../item/navigation-item";
import { Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import Icon from "@/components/icon";
import { TNavigationAction, resolveNavIcon } from "@/config/navigation";
import { useRouter } from "next/navigation";
import { useTranslate } from "@/providers/language";
import { IconButton } from "@/components/buttons";


export default function NavigationSubPopup({ navigationConfig, parentLabel, parentIcon, parentActions, open, onClose, onItemClick }: INavigationSubPopupProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useTranslate();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handleActionClick(action: TNavigationAction) {
    setMenuAnchor(null);
    if (action.path) router.push(action.path);
    if (action.callback) action.callback(null);
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div ref={drawerRef} data-sub-popup className={css.wrapper + (open ? ' ' + css.open : '')}>
      <div className={css.drawer}>

        <div className={css.header}>
          <div className={css.headerText}>
            <div>{resolveNavIcon(parentIcon)}</div>
            <Typography variant="subtitle1" className={css.headerTitle}>{t(parentLabel)}</Typography>
          </div>

          {parentActions && parentActions.length === 1 && (
            <div className={css.headerActions}>
              <IconButton tooltip={parentActions[0].label} onClick={() => handleActionClick(parentActions[0])}>
                {parentActions[0].icon as JSX.Element}
              </IconButton>
            </div>
          )}

          {parentActions && parentActions.length > 1 && (
            <div className={css.headerActions}>
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <Icon name="dots-more" direction="vertical" size={20} />
              </IconButton>
              <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
                {parentActions.map((action, index) => (
                  <MenuItem key={index} onClick={() => handleActionClick(action)}>
                    {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                    <ListItemText>{action.label}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </div>

        {navigationConfig.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.title && <div className={css.groupTitle}>{t(group.title)}</div>}
            <div className={css.grid}>
              {group.items.map((item, index) => (
                <NavigationItem
                  key={index}
                  mini
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  exact={item.exact}
                  onClick={onItemClick}
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );


}
