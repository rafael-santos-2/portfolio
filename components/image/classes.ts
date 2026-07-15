import { create_classes } from "@/providers/theme/create-classes";

// ----------------------------------------------------------------------

export const imageClasses = {
  root: create_classes('image__root'),
  img: create_classes('image__img'),
  overlay: create_classes('image__overlay'),
  placeholder: create_classes('image__placeholder'),
  state: {
    loaded: '--loaded',
  },
};
