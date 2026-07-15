// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { create_classes } from "@/providers/theme/create-classes";


// CLASSES
// ----------------------------------------------------------------------------------------------------
export const uploadClasses = {
  upload: create_classes('upload'),
  uploadBox: create_classes('upload__box'),
  uploadAvatar: create_classes('upload__avatar'),
  uploadSinglePreview: create_classes('upload__single__preview'),
  uploadMultiPreview: create_classes('upload__multi__preview'),
  uploadRejectionFiles: create_classes('upload__rejection__files'),
};

export const uploadPlaceholderClasses = {
  root: create_classes('upload__placeholder__root'),
  content: create_classes('upload__placeholder__content'),
  title: create_classes('upload__placeholder__title'),
  description: create_classes('upload__placeholder__description'),
};