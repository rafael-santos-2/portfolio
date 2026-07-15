// IMPORTS
// ----------------------------------------------------------------------------------------------------

import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';
import type { Editor, EditorOptions } from '@tiptap/react';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';

// ----------------------------------------------------------------------

export type TEditorProps = Partial<EditorOptions> & {
  value?: string;
  error?: boolean;
  fullItem?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  resetValue?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  onChange?: (value: string) => void;
  slotProps?: {
    wrapper?: BoxProps;
  };
};

export type TEditorToolbarProps = {
  fullScreen: boolean;
  editor: Editor | null;
  onToggleFullScreen: () => void;
  fullItem?: TEditorProps['fullItem'];
};

export type TEditorToolbarItemProps = ButtonBaseProps & {
  label?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
};
