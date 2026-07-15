"use client";

import { JSX } from "react";
import { Header } from '@/components/header';
import { useTranslate } from "@/providers/language";
import NavigationTabs from "@/components/tabs/navigation/navigation-tabs";
import { TTab } from "@/components/tabs/navigation/navigation-tabs.type";
import { PATHS } from "@/config/paths";
import Icon from "@/components/icon";

export default function LayoutSettings({ children }:{children: React.ReactNode}): JSX.Element {


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
  const TABS:TTab[] = [
    { title: t("settings.general.title"), path: PATHS.PLATFORM.SETTINGS.ROOT, icon: <Icon name="settings" /> },
    { title: t("settings.changelog.title"), path: PATHS.PLATFORM.SETTINGS.CHANGELOG, icon: <Icon name="changelog" /> },
  ];
  return (
    
    <>

      <Header title={t("settings.title")} />

      <NavigationTabs tabs={TABS} />

      {children}

    </>
    
  )


}