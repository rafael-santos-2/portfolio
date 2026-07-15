// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from "react";
import { INavigationHeaderProps } from "./navigation-header.type";
import css from "./navigation-header.module.css";
import { Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import Icon from "@/components/icon";
import { useRouter } from "next/navigation";
import { TNavigationAction, resolveNavIcon } from "@/config/navigation";
import { IconButton } from "@/components/buttons";


export default function NavigationHeader({ actions, icon, title, extra }:INavigationHeaderProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const router = useRouter();
  
  
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
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
  
    <div className={ css.header }>

      <div className={ css.text }>
        {icon && <div className={ css.icon }>{resolveNavIcon(icon)}</div>}
        {title && <Typography variant="subtitle1" className={ css.title }>{title}</Typography>}
      </div>

      <div className={ css.actions }>
        {extra}
        {actions && actions.length === 1 && (
          <IconButton tooltip={actions[0].label} onClick={() => handleActionClick(actions[0])}>
            {actions[0].icon as JSX.Element}
          </IconButton>
        )}

        {actions && actions.length > 1 && (
          <>
            <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
              <Icon name="dots-more" direction="vertical" size={20} />
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
    
    </div>
    
  )


}