// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect } from "react";
import { INavigationItemProps } from "./navigation-item.type";
import css from "./navigation-item.module.css";
import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslate } from "@/providers/language";
import { useNavigationContext } from "../context-navigation";
import { resolveNavIcon } from "@/config/navigation";


export default function NavigationItem({ icon, label, path, caption, onClick, isLogout, mini, exact, subNavigation, actions, hideLabelOnMini, active, suffix }:INavigationItemProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const { setActiveSubNavigation } = useNavigationContext();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function handleClick() {
    onClick?.();
  }

  const pathname = usePathname();
  const isActive = path ? (exact ? pathname === path : (pathname === path || pathname.startsWith(path + "/"))) : false;
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (isActive && subNavigation) {
      setActiveSubNavigation(subNavigation, { label, icon, actions });
    }
  }, [isActive, subNavigation, setActiveSubNavigation, label, icon, actions]);
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  const content = (
    <>
      {resolveNavIcon(icon)}
      {!(mini && hideLabelOnMini) && (
        <div className={ css.text }>
          <p style={{ ...(caption ? { lineHeight: 1 } : {}), ...(suffix ? { display: "inline-flex", alignItems: "center", gap: 2 } : {}) }}>{t(label)}{suffix}</p>
          {caption && <Typography variant="caption" color="textSecondary" className={ css.caption }>{t(caption)}</Typography>}
        </div>
      )}
    </>
  );

  const itemClass =
    css.item +
    ((isActive || active) ? ' ' + css.active : '') +
    (isLogout ? ' ' + css.logout : '') +
    (mini ? ' ' + css.mini : '');

  if (path) {
    return (
      <Link href={path} className={itemClass} onClick={handleClick}>
        {content}
      </Link>
    );
  }
  return (
    <div className={itemClass} onClick={handleClick}>
      {content}
    </div>
  );


}