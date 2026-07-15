"use client";

import { JSX } from "react";
import css from "./layout-platform.module.css";
import Navigation from "@/components/navigation/navigation";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import { NavigationProvider, useNavigationContext } from "@/components/navigation/context-navigation";
import { useAuthContext } from "@/providers/authentication/context-authentication";
import { useVersion } from "@/hooks/use-version";
import { useMaintenance } from "@/hooks/use-maintenance";
// import PopupWhatsNew from "@/widgets/popup/whats-new/popup-whats-new";
// import { PopupMaintenanceUpcoming } from '@/components/popups/maintenance';
import MaintenanceScreen from "@/widgets/maintenance/maintenance-screen";
import Popup_version from "@/widgets/popups/version/popup-version";


function LayoutPlatformInner({children}:{children:React.ReactNode}): JSX.Element {

  const { activeSubNavigation, isSubExpanded } = useNavigationContext();

  return (
    <div className={ css.container }>

      <div className={ css.navigation }>
        <Navigation headerType="logo" navigationConfig={NAVIGATION_CONFIG} />
      </div>

      <div className={ css.subNavigation + ' ' + (activeSubNavigation ? (isSubExpanded ? css.subNavigationOpen : css.subNavigationCollapsed) : '') }>
        {activeSubNavigation && (
          <Navigation headerType="group" navigationConfig={activeSubNavigation} disableFooter sub />
        )}
      </div>

      <div className={ css.content }>
        {children}
      </div>

    </div>
  );
}


export default function LayoutPlatform({children}:{children:React.ReactNode}): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { user } = useAuthContext();
  const whatsNew = useVersion(user);
  const maintenance = useMaintenance();


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <NavigationProvider>
      <LayoutPlatformInner>{children}</LayoutPlatformInner>
      <Popup_version {...whatsNew} />
      {/* <PopupMaintenanceUpcoming maintenance={maintenance.upcoming} onDismiss={maintenance.onDismissUpcoming} /> */}
      {maintenance.active && <MaintenanceScreen maintenance={maintenance.active} />}
    </NavigationProvider>
  )


}