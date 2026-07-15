import type { Shadows, Direction, ColorSystemOptions, CssVarsThemeOptions, ThemeOptions as MuiThemeOptions, SupportedColorScheme, CommonColors, PaletteColor } from '@mui/material/styles';


// ----------------------------------------------------------------------

/**
 * Theme options
 * Extended type that includes additional properties for color schemes and CSS variables.
 *
 * @see https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createTheme.ts
 */

export type TPaletteColorNoChannels = Omit<PaletteColor & {  lighter: string; darker: string; }, 'lighterChannel' | 'darkerChannel'>;

export type TThemeColorScheme = SupportedColorScheme;
export type TThemeDirection = Direction;
export type TThemeCssVariables = Pick<
  CssVarsThemeOptions,
  'colorSchemeSelector' | 'disableCssColorScheme' | 'cssVarPrefix' | 'shouldSkipGeneratingVar'
>;

type TColorSchemeOptionsExtended = ColorSystemOptions & {
  shadows?: Shadows;
};

export type TThemeOptions = Omit<MuiThemeOptions, 'components'> &
  Pick<CssVarsThemeOptions, 'defaultColorScheme' | 'components'> & {
    colorSchemes?: Record<TThemeColorScheme, TColorSchemeOptionsExtended>;
    cssVariables?: TThemeCssVariables;
  };

export type TThemeConfig = {
  classesPrefix: string;
  modeStorageKey: string;
  direction: TThemeDirection;
  defaultMode: TThemeColorScheme;
  cssVariables: TThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    TPaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      string
    >;
  };
};
