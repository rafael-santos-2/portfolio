// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useMemo, useState } from "react";
import css from "./navigation.module.css";
import NavigationHeader from "./header/navigation-header";
import { INavigationProps } from "./navigation.type";
import { Logo } from '@/components/logo';
import NavigationFooter from "./footer/navigation-footer";
import NavigationGroup from "./group/navigation-group";
import { isMobile } from "@/utils/mobile";
import NavigationItem from "./item/navigation-item";
import NavigationMore from "./more/navigation-more";
import { useNavigationContext } from "./context-navigation";
import Icon from "@/components/icon";
import NotificationBell from "@/components/notifications/notification-bell";
import { useTranslate } from "@/providers/language";
import { useAuthContext } from "@/providers/authentication/context-authentication";
import { PATHS } from "@/config/paths";
import { formatInitials, formatUsername } from "@/utils/formatters";
import { getUrl } from "@/utils/firebase";
import { Avatar } from "@mui/material";
import { TNavigationConfig, TNavigationItem } from "@/config/navigation";
import { IGuardRole } from "@/guards/guard/guard.type";
import { IUser } from "@/types/database";
import { usePathname, useRouter } from "next/navigation";
import { IconButton } from "@/components/buttons";


// HELPERS
// ----------------------------------------------------------------------------------------------------
function hasAccess(roles: IGuardRole[] | undefined, user: IUser | null): boolean {
  if (!roles || roles.length === 0) return true;
  if (!user) return false;
  if (user.role === "Developer") return true;
  return roles.some((r) => r.role === user.role);
}

function filterNavConfig(config: TNavigationConfig, user: IUser | null): TNavigationConfig {
  return config
    .filter((group) => hasAccess(group.roles, user))
    .map((group) => ({ ...group, items: group.items.filter((item) => hasAccess(item.roles, user)) }))
    .filter((group) => group.items.length > 0);
}


export default function Navigation({ headerType, navigationConfig, disableFooter, sub }:INavigationProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const pathname = usePathname();
  const ROUTER = useRouter();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const { isMainExpanded, toggleMainExpanded, activeParentItem, isSubExpanded, toggleSubExpanded } = useNavigationContext();
  const isExpanded = sub ? isSubExpanded : (disableFooter ? true : isMainExpanded);
  const [moreOpen, setMoreOpen] = useState(false);
  const [selectedMoreItem, setSelectedMoreItem] = useState<TNavigationItem | null>(null);
  const [subNavItem, setSubNavItem] = useState<TNavigationItem | null>(null);
  const [subNavFromMore, setSubNavFromMore] = useState(false);
  const { user, logout } = useAuthContext();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const filteredConfig = useMemo(() => filterNavConfig(navigationConfig, user), [navigationConfig, user]);

  const mobileItems = useMemo(() => {
    if (!isMobile()) return { allItems: [], visibleItems: [], moreItems: [] };
    const navItems = filteredConfig.flatMap(group => group.items);
    const footerItems: TNavigationItem[] = [];
    if (user) {
      footerItems.push({
        label: "navigation.profile",
        icon: <Avatar src={avatar} alt={user ? formatUsername(user) : ""} sx={{ width: 24, height: 24, fontSize: 12 }}>{user ? formatInitials(user) : ""}</Avatar>,
        path: PATHS.PLATFORM.PROFILE.ROOT,
      });
    }
    footerItems.push({
      label: "navigation.settings",
      icon: <Icon name="settings" />,
      path: PATHS.PLATFORM.SETTINGS.ROOT,
    });
    const allItems = [...navItems, ...footerItems];
    const hasMore = allItems.length >= 5;
    const visibleItems = hasMore ? allItems.slice(0, 4) : allItems;
    const moreItems = hasMore ? allItems.slice(4) : [];
    return { allItems, visibleItems, moreItems };
  }, [filteredConfig, user, avatar]);

  const activeMoreItem = useMemo(() => {
    return mobileItems.moreItems.find(item =>
      item.path && (item.exact ? pathname === item.path : (pathname === item.path || pathname.startsWith(item.path + "/")))
    ) ?? null;
  }, [pathname, mobileItems.moreItems]);

  const effectiveMoreItem = selectedMoreItem ?? activeMoreItem;
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function handleLogout() {
    ROUTER.replace(PATHS.AUTH.SIGN_IN);
    await logout();
  }

  function handleMobileItemClick(item: TNavigationItem) {
    setSelectedMoreItem(null);
    if (item.subNavigation) {
      setSubNavItem(item);
      setSubNavFromMore(false);
      setMoreOpen(true);
    }
  }

  function handleMoreClose() {
    setMoreOpen(false);
    setSubNavItem(null);
  }

  function handleSubItemClick() {
    const parentItem = subNavItem;
    setSubNavItem(null);
    setMoreOpen(false);
    if (parentItem) {
      const isMoreItem = mobileItems.moreItems.some(
        mi => mi.label === parentItem.label && mi.path === parentItem.path
      );
      if (isMoreItem) {
        setSelectedMoreItem(parentItem);
      }
    }
  }
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (user?.path_avatar && typeof user.path_avatar === "string") {
      getUrl(user.path_avatar).then((url) => setAvatar(url || undefined));
    }
  }, [user]);
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div className={ css.navigation + ' ' + (isExpanded ? css.expanded : '') + ' ' + (sub ? css.sub : '') }>

      {headerType === "logo" && (
        <NavigationHeader icon={<Logo small={!isExpanded} style={{ height: "40px", maxWidth:"100px" }} />} extra={<NotificationBell />} />
      )}

      {headerType === "group" && activeParentItem && (
        <NavigationHeader icon={activeParentItem.icon} title={activeParentItem.label} actions={activeParentItem.actions} />
      )}

      <div className={ css.navigationList }>

        {isMobile() ? (
          <>
            {mobileItems.visibleItems.map((item, index) => {
              const isItemActive = item.path ? (item.exact ? pathname === item.path : (pathname === item.path || pathname.startsWith(item.path + "/"))) : false;
              return (
                <NavigationItem
                  mini
                  key={index}
                  path={item.subNavigation ? undefined : item.path}
                  icon={item.icon}
                  exact={item.exact}
                  label={item.label}
                  active={isItemActive}
                  onClick={() => handleMobileItemClick(item)}
                />
              );
            })}
            {mobileItems.moreItems.length > 0 && (
              effectiveMoreItem ? (
                <NavigationItem
                  mini
                  active
                  icon={effectiveMoreItem.icon}
                  label={effectiveMoreItem.label}
                  onClick={() => {
                    if (effectiveMoreItem.subNavigation) {
                      setSubNavItem(effectiveMoreItem);
                      setSubNavFromMore(true);
                    }
                    setMoreOpen(true);
                  }}
                  suffix={<Icon name="chevron" direction={moreOpen && (subNavFromMore || !subNavItem) ? "up" : "down"} size={10} />}
                />
              ) : (
                <NavigationItem
                  mini
                  icon={<Icon name="dots-more" size={24} />}
                  label={t("navigation.more")}
                  onClick={() => setMoreOpen(true)}
                />
              )
            )}
            <NavigationMore
              items={mobileItems.moreItems}
              open={moreOpen}
              onClose={handleMoreClose}
              onSelectItem={(item) => setSelectedMoreItem(item)}
              selectedItem={effectiveMoreItem}
              subNavItem={subNavItem}
              onSubNavOpen={(item) => { setSubNavItem(item); setSubNavFromMore(true); }}
              onSubNavClose={() => setSubNavItem(null)}
              onSubItemClick={handleSubItemClick}
              showBackButton={subNavFromMore}
              onLogout={handleLogout}
            />
          </>
        ) : (
          filteredConfig.map((group, index) => (
            <NavigationGroup
              key={index}
              title={group.title}
              items={group.items}
              mini={!isExpanded}
              actions={group.actions}
              isSub={sub}
            />
          ))
        )}


      </div>

      {!disableFooter && <NavigationFooter isMenuExpanded={isExpanded} onToggleMenu={toggleMainExpanded} /> }

      {sub && (
        <div className={ css.subFooter }>
          <IconButton onClick={toggleSubExpanded}>
            <Icon name="chevron-double" direction={ isSubExpanded ? "left" : "right" } size={20} />
          </IconButton>
        </div>
      )}

    </div>

  )


}