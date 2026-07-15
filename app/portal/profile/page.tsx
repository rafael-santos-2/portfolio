// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { getServerTranslations } from "@/providers/language/server";
import ViewProfile from "@/views/profile/view-profile";
import { JSX } from "react";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { t } = await getServerTranslations(params.lang);
  return { title: t("profile.title") };
}

export default function PagePlatformProfile(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return <ViewProfile />;


}