import type { LinearProgressProps } from '@mui/material/LinearProgress';
import type { Theme, CSSObject, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

type TPaletteColor = (typeof COLORS)[number];

// ----------------------------------------------------------------------

function style_colors(ownerState: LinearProgressProps, styles: (val: TPaletteColor) => CSSObject): CSSObject {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (ownerState.color === color) {
      acc = styles(color);
    }
    return acc;
  }, {});

  return outputStyle;
}

const MuiLinearProgress: Components<Theme>['MuiLinearProgress'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const styled = {
        colors: style_colors(ownerState, (color) => ({
          backgroundColor: varAlpha(theme.palette[color].mainChannel, 0.24),
        })),
        inheritColor: {
          ...(ownerState.color === 'inherit' && {
            '&::before': { display: 'none' },
            backgroundColor: varAlpha(theme.palette.text.primaryChannel, 0.24),
          }),
        },
      };
      return {
        borderRadius: 4,
        ...(ownerState.variant !== 'buffer' && { ...styled.inheritColor, ...styled.colors }),
      };
    },
    bar: { borderRadius: 'inherit' },
  },
};

// ----------------------------------------------------------------------

export const progress = { MuiLinearProgress };
