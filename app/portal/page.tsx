// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { getServerTranslations } from "@/providers/language/server";
import ViewDashboard from "@/views/dashboard/view-dashboard";
import { JSX } from "react";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { t } = await getServerTranslations(params.lang);
  return { title: t("dashboard.title") };
}

export default function PagePlatform(): JSX.Element {


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
  return <ViewDashboard />


}