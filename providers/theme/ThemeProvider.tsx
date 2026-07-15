"use client";

import * as React from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeConfig } from "@/config/theme";
import { typographyStyles } from "./typography";
import { palette } from "./palette";
import { mixins } from "./mixins";
import { components } from "./components";
import { shadows } from "./shadows";
import { customShadows } from "./custom-shadows";
import { TThemeOptions } from "@/types/theme.type";

const themeOptions: TThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
    },
    dark: {
      palette: palette.dark,
    },
  },
  shadows: shadows.light,
  customShadows: customShadows.light,
  direction: themeConfig.direction,
  defaultColorScheme: themeConfig.defaultMode,
  typography: typographyStyles,
  cssVariables: themeConfig.cssVariables,
  shape: { borderRadius: 8 },
  mixins: mixins,
  components: components,
};

const theme = createTheme(themeOptions);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider disableTransitionOnChange theme={theme} defaultMode={themeConfig.defaultMode} modeStorageKey={themeConfig.modeStorageKey}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
