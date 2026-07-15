// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { create_classes } from '@/providers/theme/create-classes';

// ----------------------------------------------------------------------

export const editorClasses = {
  root: create_classes('editor__root'),
  toolbar: {
    hr: create_classes('editor__toolbar__hr'),
    root: create_classes('editor__toolbar__root'),
    bold: create_classes('editor__toolbar__bold'),
    code: create_classes('editor__toolbar__code'),
    undo: create_classes('editor__toolbar__undo'),
    redo: create_classes('editor__toolbar__redo'),
    link: create_classes('editor__toolbar__link'),
    clear: create_classes('editor__toolbar__clear'),
    image: create_classes('editor__toolbar__image'),
    italic: create_classes('editor__toolbar__italic'),
    strike: create_classes('editor__toolbar__strike'),
    underline: create_classes('editor__toolbar__underline'),
    hardbreak: create_classes('editor__toolbar__hardbreak'),
    unsetlink: create_classes('editor__toolbar__unsetlink'),
    codeBlock: create_classes('editor__toolbar__code__block'),
    alignLeft: create_classes('editor__toolbar__align__left'),
    fullscreen: create_classes('editor__toolbar__fullscreen'),
    blockquote: create_classes('editor__toolbar__blockquote'),
    bulletList: create_classes('editor__toolbar__bullet__list'),
    alignRight: create_classes('editor__toolbar__align__right'),
    orderedList: create_classes('editor__toolbar__ordered__list'),
    alignCenter: create_classes('editor__toolbar__align__center'),
    alignJustify: create_classes('editor__toolbar__align__justify'),
  },
  content: {
    hr: create_classes('editor__content__hr'),
    root: create_classes('editor__content__root'),
    link: create_classes('editor__content__link'),
    image: create_classes('editor__content__image'),
    codeInline: create_classes('editor__content__code'),
    heading: create_classes('editor__content__heading'),
    listItem: create_classes('editor__content__listItem'),
    codeBlock: create_classes('editor__content__code__block'),
    blockquote: create_classes('editor__content__blockquote'),
    langSelect: create_classes('editor__content__lang__select'),
    placeholder: create_classes('editor__content__placeholder'),
    bulletList: create_classes('editor__content__bullet__list'),
    orderedList: create_classes('editor__content__ordered__list'),
  },
};
