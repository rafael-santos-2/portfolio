// IMPORTS
// ----------------------------------------------------------------------------------------------------

import "@/css/global.css";
import { Metadata } from "next";
import { JSX } from "react";
import { InitColorSchemeScript } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { themeConfig } from "@/config/theme";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { ProviderAuthentication } from "@/providers/authentication/provider-authentication";
import { I18nProvider } from "@/providers/language";
import { CONFIG } from "@/config/app";
import { detectLanguage } from "@/providers/language/server";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Snackbar from "@/components/snackbar/snackbar";
import ProviderNotifications from "@/providers/notifications/provider-notifications";
import Provider_errors from "@/providers/error/provider-error";
import { Provider_popups } from "@/providers/popups/provider-popups";
import { Provider_app } from "@/providers/app/provider-app";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Bird Larsen Template",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export const SETTINGS_STORAGE_KEY: string = 'app-settings';

export async function detect_settings( storageKey: string = SETTINGS_STORAGE_KEY ): Promise<RequestCookie|null> {
  const cookieStore = await cookies();

  const settingsStore = cookieStore.get(storageKey);

  return settingsStore ? JSON.parse(settingsStore?.value) : null;
}


async function get_app_config() {
  if (CONFIG.isStaticExport) {
    return {
      lang: 'en',
      i18nLang: undefined,
      cookieSettings: undefined,
    };
  } else {
    const [lang, settings] = await Promise.all([detectLanguage(), detect_settings()]);

    return {
      lang: lang ?? 'en',
      i18nLang: lang ?? 'en',
      cookieSettings: settings,
    };
  }
}


export default async function Layout({ children }:{children: React.ReactNode}): Promise<JSX.Element> {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { defaultMode, modeStorageKey, cssVariables,  } = themeConfig;
  const appConfig = await get_app_config();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <html lang="en" suppressHydrationWarning>

      <head>
        {/* Zebra Browser Print */}
        <Script strategy="beforeInteractive" src="/BrowserPrint-3.1.250.min.js" />
        <Script strategy="beforeInteractive" src="/BrowserPrint-Zebra-1.1.250.min.js" />
        {/* Safari PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bird Larsen" />
        {/* Safari favicon fallback */}
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        {/* Chrome/Android PWA theme color */}
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body>

        <InitColorSchemeScript defaultMode={defaultMode} modeStorageKey={modeStorageKey} attribute={cssVariables.colorSchemeSelector} />

        <AppRouterCacheProvider options={{ key: 'css' }}>
          <I18nProvider lang={appConfig.i18nLang}>

            <ThemeProvider>
              <Provider_errors>
                <Provider_app>
                  <ProviderAuthentication>
                    <Provider_popups>

                      <ProviderNotifications>
                        <Snackbar />
                        {children}
                      </ProviderNotifications>

                    </Provider_popups>
                  </ProviderAuthentication>
                </Provider_app>
              </Provider_errors>
            </ThemeProvider>

          </I18nProvider>
        </AppRouterCacheProvider>

      </body>

    </html>

  )


}