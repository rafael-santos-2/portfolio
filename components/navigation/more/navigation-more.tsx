// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useRef, useState } from "react";
import css from "./navigation-more.module.css";
import { INavigationMoreProps } from "./navigation-more.type";
import { TNavigationAction, TNavigationItem, resolveNavIcon } from "@/config/navigation";
import NavigationItem from "../item/navigation-item";
import { Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import Icon from "@/components/icon";
import { useRouter } from "next/navigation";
import { useTranslate } from "@/providers/language";
import { IconButton } from "@/components/buttons";


export default function NavigationMore({ items, open, onClose, onSelectItem, selectedItem, subNavItem, onSubNavOpen, onSubNavClose, onSubItemClick, showBackButton, onLogout }: INavigationMoreProps): JSX.Element {


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
  function handleSelect(item: TNavigationItem) {
    if (item.subNavigation) {
      onSubNavOpen(item);
    } else {
      onSelectItem(item);
      onClose();
    }
  }

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
      const target = e.target as Node;
      // Ignore clicks inside MUI popover/menu portals
      const muiPopover = (target as Element).closest?.('.MuiPopover-root, .MuiModal-root, .MuiMenu-root');
      if (muiPopover) return;
      if (drawerRef.current && !drawerRef.current.contains(target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div ref={drawerRef} className={css.wrapper + (open ? ' ' + css.open : '')}>
      <div className={css.drawer}>

        {subNavItem && subNavItem.subNavigation ? (
          <div className={css.subView}>
            <div className={css.header}>
              {showBackButton && (
                <div className={css.headerBack} onClick={onSubNavClose}>
                  <Icon name="chevron" direction="left" size={20} />
                </div>
              )}
              <div className={css.headerText}>
                <div>{resolveNavIcon(subNavItem.icon)}</div>
                <Typography variant="subtitle1" className={css.headerTitle}>{t(subNavItem.label)}</Typography>
              </div>

              {subNavItem.actions && subNavItem.actions.length === 1 && (
                <div className={css.headerActions}>
                  <IconButton tooltip={subNavItem.actions[0].label} onClick={() => handleActionClick(subNavItem.actions![0])}>
                    {subNavItem.actions[0].icon as JSX.Element}
                  </IconButton>
                </div>
              )}

              {subNavItem.actions && subNavItem.actions.length > 1 && (
                <div className={css.headerActions}>
                  <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                    <Icon name="dots-more" direction="vertical" size={20} />
                  </IconButton>
                  <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
                    {subNavItem.actions.map((action, index) => (
                      <MenuItem key={index} onClick={() => handleActionClick(action)}>
                        {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                        <ListItemText>{action.label}</ListItemText>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              )}
            </div>

            {subNavItem.subNavigation.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.title && <div className={css.groupTitle}>{t(group.title)}</div>}
                <div className={css.subGrid}>
                  {group.items.map((item, index) => (
                    <NavigationItem
                      key={index}
                      mini
                      icon={item.icon}
                      label={item.label}
                      path={item.path}
                      exact={item.exact}
                      onClick={onSubItemClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={css.content}>
            <div className={css.grid}>
              {items.map((item, index) => {
                const isSelected = selectedItem?.label === item.label && selectedItem?.path === item.path;
                return (
                  <NavigationItem
                    key={index}
                    mini
                    icon={item.icon}
                    label={item.label}
                    path={item.subNavigation ? undefined : item.path}
                    exact={item.exact}
                    active={isSelected}
                    onClick={() => handleSelect(item)}
                  />
                );
              })}
              {onLogout && (
                <NavigationItem
                  mini
                  isLogout
                  icon={<Icon name="logout" />}
                  label={t("navigation.logout")}
                  onClick={onLogout}
                />
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );


}
