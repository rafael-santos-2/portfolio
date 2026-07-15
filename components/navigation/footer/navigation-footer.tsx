// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useState } from "react";
import css from "./navigation-footer.module.css";
import Icon from "@/components/icon";
import { INavigationFooterProps } from "./navigation-footer.type";
import { useTranslate } from "@/providers/language";
import { Avatar, Typography } from "@mui/material";
import { CONFIG } from "@/config/app";
import NavigationItem from "../item/navigation-item";
import { useAuthContext } from "@/providers/authentication/context-authentication";
import { useRouter } from "next/navigation";
import { PATHS } from "@/config/paths";
import { formatInitials, formatUsername } from "@/utils/formatters";
import { getUrl } from "@/utils/firebase";
import { IconButton } from "@/components/buttons";
import LanguageSelect from "@/providers/language/language-select";


export default function NavigationFooter({ isMenuExpanded, onToggleMenu }:INavigationFooterProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const { user, logout } = useAuthContext();
  const ROUTER = useRouter();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [fetchedAvatarUrl, setFetchedAvatarUrl] = useState<string | undefined>(undefined);

  const avatar = user?.path_avatar ? fetchedAvatarUrl : undefined;
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function handleLogout() {
    ROUTER.replace(PATHS.AUTH.SIGN_IN);
    await logout();
  }
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!user?.path_avatar || typeof user.path_avatar !== "string") return;

    let cancelled = false;
    getUrl(user.path_avatar).then((url) => {
      if (!cancelled) setFetchedAvatarUrl(url || undefined);
    });
    return () => { cancelled = true; };
  }, [user?.path_avatar]);
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
  
    <div className={ css.footer }>

      <div className={ css.collapse }>

        <Typography variant="caption" color="textSecondary">{CONFIG.version}</Typography>
        <LanguageSelect />

        <IconButton tooltip={ isMenuExpanded ? t("navigation.collapse") : t("navigation.expand") } onClick={onToggleMenu}>
          <Icon name="chevron-double" direction={ isMenuExpanded ? "left" : "right" } />
        </IconButton>

      </div>

      <div className={ css.list }>

        {user && (
          <NavigationItem
            caption={user.email}
            mini={!isMenuExpanded}
            label={isMenuExpanded ? formatUsername(user) : t('navigation.profile')}
            path={PATHS.PLATFORM.PROFILE.ROOT}
            icon={
              <Avatar src={avatar} alt={formatUsername(user)} sx={{ width: 24, height: 24, fontSize: 12 }}>
                {formatInitials(user)}
              </Avatar>
            }
          />
        )}

        <NavigationItem
          mini={!isMenuExpanded}
          icon={<Icon name="settings" />}
          label={t("navigation.settings")}
          path={PATHS.PLATFORM.SETTINGS.ROOT}
        />

        <NavigationItem
          isLogout
          icon={<Icon name="logout" />}
          onClick={handleLogout}
          mini={!isMenuExpanded}
          label={t("navigation.logout")}
        />

      </div>
    
    </div>
    
  )


}