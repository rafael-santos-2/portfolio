import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const MuiSkeleton: Components<Theme>['MuiSkeleton'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { animation: 'wave', variant: 'rounded' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: varAlpha(theme.palette.grey['400Channel'], 0.12),
    }),
    rounded: ({ theme }) => ({
      borderRadius: typeof theme.shape.borderRadius === 'number'
        ? theme.shape.borderRadius * 2
        : `${parseInt(theme.shape.borderRadius as string, 10) * 2}px`
    }),
  },
};

// ----------------------------------------------------------------------

export const skeleton = { MuiSkeleton };
