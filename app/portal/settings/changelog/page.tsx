// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { getServerTranslations } from "@/providers/language/server";
import ViewChangelog from "@/views/changelog/view-changelog";
import { JSX } from "react";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { t } = await getServerTranslations(params.lang);
  return { title: `${t("settings.title")} - ${t("settings.changelog.title")}` };
}

export default function PagePlatformSettingsChangelog(): JSX.Element {


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
  return <ViewChangelog />;


}