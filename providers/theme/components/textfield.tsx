import type { Theme, Components } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { inputBaseClasses } from '@mui/material/InputBase';
import { filledInputClasses } from '@mui/material/FilledInput';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      [`&.${inputBaseClasses.disabled}`]: { '& svg': { color: theme.vars?.palette.text.disabled || theme.palette.text.disabled } },
      [`& .${inputBaseClasses.input}:focus`]: { borderRadius: 'inherit' },
    }),
    input: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(15),
      [theme.breakpoints.down('sm')]: {
        // This will prevent zoom in Safari min font size ~ 16px
        fontSize: theme.typography.pxToRem(16),
      },
      '&::placeholder': { opacity: 1, color: theme.vars?.palette.text.disabled || theme.palette.text.disabled },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiInput: Components<Theme>['MuiInput'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    underline: ({ theme }) => ({
      '&::before': { borderBottomColor: varAlpha(theme.vars?.palette.grey[500] || theme.palette.grey['500Channel'], 0.32) },
      '&::after': { borderBottomColor: theme.vars?.palette.text.primary || theme.palette.text.primary },
    }),
  },
};

// ----------------------------------------------------------------------

const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({

      height: "auto",
      minHeight: 48,

      [`&.${outlinedInputClasses.focused}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderWidth: 1,
          borderColor: theme.palette.primary.main || theme.palette.text.primary,
        },
      },
      [`&.${outlinedInputClasses.error}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.error.main || theme.palette.error.main,
        },
      },
      [`&.${outlinedInputClasses.disabled}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          opacity: 0.7,
          borderColor: theme.palette.action.disabledBackground || theme.palette.action.disabledBackground,
        },
      },
    }),
    notchedOutline: ({ theme }) => ({
      borderWidth: 1,

      borderColor: varAlpha(theme.palette.grey["500Channel"] || theme.palette.grey["100Channel"], 0.2),
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.shortest,
      }),
    }),
  },
};

// ----------------------------------------------------------------------

const MuiFilledInput: Components<Theme>['MuiFilledInput'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { disableUnderline: true },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius,
      backgroundColor: varAlpha(theme.palette.grey["500Channel"] || theme.palette.grey['500Channel'], 0.08),
      '&:hover': { backgroundColor: varAlpha(theme.palette.grey["500Channel"] || theme.palette.grey['500Channel'], 0.16) },
      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: varAlpha(theme.palette.grey["500Channel"] || theme.palette.grey['500Channel'], 0.16),
      },
      [`&.${filledInputClasses.error}`]: {
        backgroundColor: varAlpha(theme.palette.error.mainChannel || theme.palette.error.main, 0.08),
        [`&.${filledInputClasses.focused}`]: {
          backgroundColor: varAlpha(theme.palette.error.mainChannel || theme.palette.error.main, 0.16),
        },
      },
      [`&.${filledInputClasses.disabled}`]: {
        backgroundColor: theme.palette.action.disabledBackground || theme.palette.action.disabledBackground,
      },
    }),
  },
};

const MuiTextField: Components<Theme>['MuiTextField'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { variant: 'outlined' },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {},
};

// ----------------------------------------------------------------------

export const textfield = {
  MuiInput,
  MuiInputBase,
  MuiFilledInput,
  MuiOutlinedInput,
  MuiTextField,
};
