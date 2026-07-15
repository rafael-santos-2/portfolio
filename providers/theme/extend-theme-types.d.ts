/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import type { TFontStyleExtend } from './typography';
import type { TCustomShadows } from './custom-shadows';
import type { TChipExtendVariant } from './components/chip';
import type { TBadgeExtendVariant } from './components/badge';
import type { TSliderExtendColor } from './components/slider';
import type { TButtonExtendVariant } from './components/button';
import type { TFabExtendVariant } from './components/button-fab';
import type { TAvatarGroupExtendVariant } from './components/avatar';
import type { TButtonGroupExtendVariant } from './components/button-group';
import type { TPaginationExtendColor, TPaginationExtendVariant } from './components/pagination';
import type {
  TGreyExtend,
  TTypeTextExtend,
  TCommonColorsExtend,
  TPaletteColorExtend,
  TTypeBackgroundExtend,
} from './palette';
import type {
  TBgBlurMixin,
  TMaxLineMixin,
  TBgGradientMixin,
  TPaperStylesMixin,
  TTextGradientMixin,
  TMenuItemStylesMixin,
  TBorderGradientProps,
} from './mixins';

// ----------------------------------------------------------------------

/** **************************************
 * EXTEND CORE
 * Palette, typography, shadows...
 *************************************** */

/**
 * Palette
 * https://mui.com/customization/palette/
 * @from {@link file://./core/palette.ts}
 */
declare module '@mui/material/styles' {
  // grey
  interface Color extends TGreyExtend {}
  // text
  interface TypeText extends TTypeTextExtend {}
  // black & white
  interface CommonColors extends TCommonColorsExtend {}
  // background
  interface TypeBackground extends TTypeBackgroundExtend {}
  // primary, secondary, info, success, warning, error
  interface PaletteColor extends TPaletteColorExtend {}
  interface SimplePaletteColorOptions extends TPaletteColorExtend {}
}

/**
 * Typography
 * https://mui.com/customization/typography/
 * @from {@link file://./core/typography.ts}
 */
declare module '@mui/material/styles' {
  interface TypographyVariants extends TFontStyleExtend {}
  interface TypographyVariantsOptions extends Partial<TFontStyleExtend> {}
}

declare module '@mui/material/styles' {
  /**
   * Custom shadows
   * @from {@link file://./core/custom-shadows.ts}
   */
  interface Theme {
    customShadows:TCustomShadows;
  }
  interface ThemeOptions {
    customShadows?: TCustomShadows;
  }
  interface ThemeVars {
    customShadows: TCustomShadows;
    typography: Theme['typography'];
    transitions: Theme['transitions'];
  }
}

/** **************************************
 * EXTEND COMPONENTS
 *************************************** */

/**
 * AvatarGroup
 * https://mui.com/components/avatars/
 * @from {@link file://./core/components/avatar.tsx}
 */
declare module '@mui/material/AvatarGroup' {
  interface AvatarGroupPropsVariantOverrides extends TAvatarGroupExtendVariant {}
}

/**
 * Badge
 * https://mui.com/components/badges/
 * @from {@link file://./core/components/badge.tsx}
 */
declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides extends TBadgeExtendVariant {}
}

/**
 * Button
 * https://mui.com/components/buttons/
 * @from {@link file://./core/components/button.tsx}
 */
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides extends TButtonExtendVariant {}
}

/**
 * MuiButtonGroup
 * https://mui.com/components/button-group/
 * @from {@link file://./core/components/button-group.tsx}
 */
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides extends TButtonGroupExtendVariant {}
}

/**
 * MuiFab
 * https://mui.com/components/floating-action-button/
 * @from {@link file://./core/components/button-fab.tsx}
 */
declare module '@mui/material/Fab' {
  interface FabPropsVariantOverrides extends TFabExtendVariant {}
}

/**
 * MuiChip
 * https://mui.com/components/chips/
 * @from {@link file://./core/components/chip.tsx}
 */
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides extends TChipExtendVariant {}
}

/**
 * MuiPagination
 * https://mui.com/components/pagination/
 * @from {@link file://./core/components/pagination.tsx}
 */
declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides extends TPaginationExtendVariant {}
  interface PaginationPropsColorOverrides extends TPaginationExtendColor {}
}

/**
 * MuiSlider
 * https://mui.com/components/slider/
 * @from {@link file://./core/components/slider.tsx}
 */
declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides extends TSliderExtendColor {}
}

/** **************************************
 * EXTEND MIXINS
 *************************************** */
/**
 * @from {@link file://./core/mixins.ts}
 */
declare module '@mui/material/styles' {
  interface Mixins {
    hideScrollX: CSSObject;
    hideScrollY: CSSObject;
    borderGradient: TBorderGradientProps;
    bgGradient: TBgGradientMixin;
    bgBlur: TBgBlurMixin;
    textGradient: TTextGradientMixin;
    maxLine: TMaxLineMixin;
    menuItemStyles: TMenuItemStylesMixin;
    paperStyles: TPaperStylesMixin;
  }
  interface MixinsOptions {
    hideScrollX?: CSSObject;
    hideScrollY?: CSSObject;
    borderGradient?: TBorderGradientProps;
    bgGradient?: TBgGradientMixin;
    bgBlur?: TBgBlurMixin;
    textGradient?: TTextGradientMixin;
    maxLine?: TMaxLineMixin;
    menuItemStyles?: TMenuItemStylesMixin;
    paperStyles?: TPaperStylesMixin;
  }
}
