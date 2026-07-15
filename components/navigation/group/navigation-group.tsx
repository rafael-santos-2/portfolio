// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState, useRef } from "react";
import css from "./navigation-group.module.css";
import { INavigationGroupProps } from "./navigation-group.type";
import NavigationItem from "../item/navigation-item";
import Icon from "@/components/icon";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { TNavigationAction } from "@/config/navigation";
import { IconButton } from "@/components/buttons";
import { useNavigationContext } from "../context-navigation";


export default function NavigationGroup({ items, actions, title, mini, isSub }:INavigationGroupProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const router = useRouter();
  const { setActiveSubNavigation } = useNavigationContext();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [active_popup, set_active_popup] = useState<React.ReactNode | null>(null);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handleActionClick(action: TNavigationAction) {
    setMenuAnchor(null);
    if (action.popup) { set_active_popup(action.popup(() => set_active_popup(null))); return; }
    if (action.path) router.push(action.path);
    if (action.callback) action.callback(null);
  }
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
  
    <div className={ css.group }>

      {title && !mini && (
        <div className={ css.titleRow }>
          <div className={ css.titleWrapper } onClick={() => setIsOpen((prev) => !prev)}>
            <span className={ css.chevron + ' ' + (isOpen ? css.chevronOpen : '') }>
              <Icon name="chevron" direction="right" size={14} />
            </span>
            <p className={ css.title }>{title}</p>
          </div>

          {actions && actions.length === 1 && (
            <IconButton tooltip={actions[0].label} size="small" onClick={() => handleActionClick(actions[0])}>
              {actions[0].icon as JSX.Element}
            </IconButton>
          )}

          {actions && actions.length > 1 && (
            <>
              <IconButton size="small" onClick={(e) => { e.stopPropagation(); setMenuAnchor(e.currentTarget); }}>
                <Icon name="dots-more" direction="vertical" size={16} />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={() => setMenuAnchor(null)}
              >
                {actions.map((action, index) => (
                  <MenuItem key={index} onClick={() => handleActionClick(action)}>
                    {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
                    <ListItemText>{action.label}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </div>
      )}

      <div
        ref={listRef}
        className={ css.itemList + ' ' + (isOpen ? css.itemListOpen : '') }
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className={ css.itemListInner }>
          {items.map((item, index) => (
            <NavigationItem
              key={index}
              mini={mini}
              path={item.path}
              icon={item.icon}
              exact={item.exact}
              label={item.label}
              caption={item.caption}
              subNavigation={item.subNavigation}
              actions={item.actions}
              onClick={item.subNavigation ? () => setActiveSubNavigation(item.subNavigation!, { label: item.label, icon: item.icon, actions: item.actions }) : (!isSub ? () => setActiveSubNavigation(null) : undefined)}
            />
          ))}
        </div>
      </div>
    
    {active_popup}

    </div>

  )


}