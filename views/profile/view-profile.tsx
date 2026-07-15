"use client";

import { JSX } from "react";
import { useTranslate } from "@/providers/language";
import Icon from "@/components/icon";
import { useAuthContext } from "@/providers/authentication/context-authentication";
import ViewEmpty from "../general/empty/view-empty";
import Profile from "@/sections/profile/profile";
import { Header } from '@/components/header';


export default function ViewProfile(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const { user } = useAuthContext();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  if (!user) {
    return <ViewEmpty title={t("profile.notFound.title")} description={t("profile.notFound.description")} />
  }

  return (
  
    <>

      <Header title={t("profile.title")} icon={<Icon name="profile" />} />

      <Profile user={user} />
    
    </>
    
  )


}