// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { getServerTranslations } from "@/providers/language/server";
import ViewUnderConstruction from "@/views/general/under-construction/view-under-construction";
import { JSX } from "react";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { t } = await getServerTranslations(params.lang);
  return { title: t("settings.title") };
}

export default function PagePlatformSettings(): JSX.Element {


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
  return <ViewUnderConstruction />;


}