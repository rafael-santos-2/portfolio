import { CSSObject, styled } from "@mui/material";
import { Toaster } from "sonner";
import { snackbarClasses } from "./classes";
import { varAlpha } from "minimal-shared/utils";

export const SnackbarRoot = styled(Toaster)(({ theme }) => {
  const coloredToast: CSSObject = {
    padding: theme.spacing(1, 1.5, 1, 1),
    color: theme.vars.palette.text.primary,
    backgroundColor: theme.vars.palette.background.paper,
    border: `1px solid ${varAlpha(theme.vars.palette.grey[500], 0.12)}`,
    boxShadow: theme.vars.customShadows.z8,
    backdropFilter: 'blur(8px)',
  };

  const defaultToast: CSSObject = {
    padding: theme.spacing(1, 1.5, 1, 1.5),
    color: theme.vars.palette.background.paper,
    backgroundColor: theme.vars.palette.grey[900],
    border: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.08)}`,
    boxShadow: theme.vars.customShadows.z8,
  };

  const loadingStyles: CSSObject = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    transform: 'none',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 'inherit',
    justifyContent: 'center',
    background: theme.vars.palette.background.neutral,
    [`& .${snackbarClasses.loadingIcon}`]: {
      zIndex: 9,
      width: 24,
      height: 24,
      borderRadius: '50%',
      animation: 'rotate 3s infinite linear',
      background: `conic-gradient(transparent, ${varAlpha(theme.vars.palette.text.disabledChannel, 0.64)})`,
    },
    [snackbarClasses.loaderVisible]: { display: 'flex' },
  };

  return {
    width: 360,

    /**
     * Remove gap between toasts when expanded (hover)
     */
    '& [data-sonner-toast][data-expanded="true"]::after': {
      height: '0 !important',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 32px)',
      left: 16,
      right: 16,
    },

    /**
     * Toast base
     */
    [`& .${snackbarClasses.toast}`]: {
      gap: 10,
      width: '100%',
      minHeight: 56,
      display: 'flex',
      borderRadius: 10,
      alignItems: 'center',
      position: 'relative',
      transition: theme.transitions.create(['box-shadow', 'transform'], {
        duration: theme.transitions.duration.shorter,
      }),
    },

    /**
     * Content
     */
    [`& .${snackbarClasses.content}`]: {
      gap: 1,
      flex: '1 1 auto',
    },
    [`& .${snackbarClasses.title}`]: {
      ...theme.typography.subtitle2,
      lineHeight: 1.4,
    },
    [`& .${snackbarClasses.description}`]: {
      ...theme.typography.caption,
      opacity: 0.72,
      marginTop: 1,
    },

    /**
     * Close button
     */
    [`& .${snackbarClasses.closeButton}`]: {
      position: 'absolute',
      top: 8,
      right: 8,
      left: 'auto',
      width: 20,
      height: 20,
      color: 'currentColor',
      opacity: 0.48,
      backgroundColor: 'transparent',
      transform: 'none',
      border: 'none',
      borderRadius: 4,
      transition: theme.transitions.create(['opacity', 'background-color']),
      '&:hover': {
        opacity: 1,
        backgroundColor: varAlpha(theme.vars.palette.grey[500], 0.12),
      },
    },

    /**
     * Icon wrapper
     */
    [`& .${snackbarClasses.icon}`]: {
      margin: 0,
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      flexShrink: 0,
      [`& .${snackbarClasses.iconSvg}`]: { width: 20, height: 20, fontSize: 0 },
    },

    '@keyframes rotate': { to: { transform: 'rotate(1turn)' } },

    /**
     * @variant default
     */
    [`& .${snackbarClasses.default}`]: {
      ...defaultToast,
      [`&:has(${snackbarClasses.closeBtnVisible})`]: {
        [`& .${snackbarClasses.content}`]: { paddingRight: 28 },
      },
      [`&:has(.${snackbarClasses.loader})`]: {
        ...coloredToast,
      },
      [`& .${snackbarClasses.loader}`]: loadingStyles,
    },

    /**
     * @variant success
     */
    [`& .${snackbarClasses.success}`]: {
      ...coloredToast,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.success.dark,
        backgroundColor: varAlpha(theme.vars.palette.success.mainChannel, 0.1),
      },
    },

    /**
     * @variant error
     */
    [`& .${snackbarClasses.error}`]: {
      ...coloredToast,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.error.dark,
        backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.1),
      },
    },

    /**
     * @variant warning
     */
    [`& .${snackbarClasses.warning}`]: {
      ...coloredToast,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.warning.dark,
        backgroundColor: varAlpha(theme.vars.palette.warning.mainChannel, 0.1),
      },
    },

    /**
     * @variant info
     */
    [`& .${snackbarClasses.info}`]: {
      ...coloredToast,
      [`& .${snackbarClasses.icon}`]: {
        color: theme.vars.palette.info.dark,
        backgroundColor: varAlpha(theme.vars.palette.info.mainChannel, 0.1),
      },
    },
  };
});
