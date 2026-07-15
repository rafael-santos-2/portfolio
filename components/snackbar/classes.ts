import { create_classes } from "@/providers/theme/create-classes";

// ----------------------------------------------------------------------

export const snackbarClasses = {
  root: create_classes('snackbar__root'),
  toast: create_classes('snackbar__toast'),
  title: create_classes('snackbar__title'),
  icon: create_classes('snackbar__icon'),
  iconSvg: create_classes('snackbar__icon__svg'),
  content: create_classes('snackbar__content'),
  description: create_classes('snackbar__description'),
  actionButton: create_classes('snackbar__action__button'),
  cancelButton: create_classes('snackbar__cancel__button'),
  closeButton: create_classes('snackbar__close_button'),
  loadingIcon: create_classes('snackbar__loading_icon'),
  /********/
  default: create_classes('snackbar__default'),
  error: create_classes('snackbar__error'),
  success: create_classes('snackbar__success'),
  warning: create_classes('snackbar__warning'),
  info: create_classes('snackbar__info'),
  /********/
  loader: 'sonner-loader',
  loaderVisible: '&[data-visible="true"]',
  closeBtnVisible: '[data-close-button="true"]',
};
