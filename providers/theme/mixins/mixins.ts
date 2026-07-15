import { borderGradient } from './border';
import { maxLine, textGradient } from './text';
import { bgBlur, bgGradient } from './background';
import { paperStyles, menuItemStyles } from './global-styles-components';

// ----------------------------------------------------------------------

export type * from './text';
export type * from './border';
export type * from './background';
export type * from './global-styles-components';

export type TBgBlurMixin = typeof bgBlur;
export type TMaxLineMixin = typeof maxLine;
export type TBgGradientMixin = typeof bgGradient;
export type TPaperStylesMixin = typeof paperStyles;
export type TTextGradientMixin = typeof textGradient;
export type TMenuItemStylesMixin = typeof menuItemStyles;
export type TBorderGradientProps = typeof borderGradient;

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../../extend-theme-types.d.ts}
 */

export const mixins = {
  hideScrollX: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowX: 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  hideScrollY: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowY: 'auto',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  borderGradient,
  bgGradient,
  bgBlur,
  textGradient,
  paperStyles,
  menuItemStyles,
  maxLine,
};
