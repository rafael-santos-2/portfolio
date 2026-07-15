import { varAlpha } from 'minimal-shared/utils';

import { grey, info, error, common, primary, success, warning, secondary } from './palette';

import type { TThemeColorScheme } from '@/types/theme.type';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../extend-theme-types.d.ts}
 */

export interface ICustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  primary?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  card?: string;
  dialog?: string;
  dropdown?: string;
}

// ----------------------------------------------------------------------

export function create_shadow_color(colorChannel: string): string {
  return `0 8px 16px 0 ${varAlpha(colorChannel, 0.24)}`;
}

function create_custom_shadows(colorChannel: string): ICustomShadows {
  return {
    z1: `0 1px 2px 0 ${varAlpha(colorChannel, 0.16)}`,
    z4: `0 4px 8px 0 ${varAlpha(colorChannel, 0.16)}`,
    z8: `0 8px 16px 0 ${varAlpha(colorChannel, 0.16)}`,
    z12: `0 12px 24px -4px ${varAlpha(colorChannel, 0.16)}`,
    z16: `0 16px 32px -4px ${varAlpha(colorChannel, 0.16)}`,
    z20: `0 20px 40px -4px ${varAlpha(colorChannel, 0.16)}`,
    z24: `0 24px 48px 0 ${varAlpha(colorChannel, 0.16)}`,
    /********/
    dialog: `-40px 40px 80px -8px ${varAlpha(common.blackChannel, 0.24)}`,
    card: `0 0 2px 0 ${varAlpha(colorChannel, 0.2)}, 0 12px 24px -4px ${varAlpha(colorChannel, 0.12)}`,
    dropdown: `0 0 2px 0 ${varAlpha(colorChannel, 0.24)}, -20px 20px 40px -4px ${varAlpha(colorChannel, 0.24)}`,
    /********/
    primary: create_shadow_color(primary.mainChannel),
    secondary: create_shadow_color(secondary.mainChannel),
    info: create_shadow_color(info.mainChannel),
    success: create_shadow_color(success.mainChannel),
    warning: create_shadow_color(warning.mainChannel),
    error: create_shadow_color(error.mainChannel),
  };
}

export const customShadows: Record<TThemeColorScheme, ICustomShadows> = {
  light: create_custom_shadows(grey['500Channel']),
  dark: create_custom_shadows(common.blackChannel),
};
