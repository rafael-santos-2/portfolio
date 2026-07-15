import { getServerTranslations } from "@/providers/language/server";
import ViewForgotPassword from "@/views/auth/view-forgot-password";
import { JSX } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { t } = await getServerTranslations(lang);
  return { title: t("auth.forgotPassword.title") };
}

export default function PageForgotPassword(): JSX.Element {


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
  return <ViewForgotPassword />;


}