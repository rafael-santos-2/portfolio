// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { getServerTranslations } from "@/providers/language/server";
import ViewNotFound from "@/views/general/not-found/view-not-found";
import { JSX } from "react";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { t } = await getServerTranslations(params.lang);
  return { title: t("general.notFound.title") };
}

export default function NotFound(): JSX.Element {


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
  return <ViewNotFound />


}