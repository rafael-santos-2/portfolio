import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type TLabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type TLabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';

export interface ILabelProps extends React.ComponentProps<'span'> {
  sx?: SxProps<Theme>;
  disabled?: boolean;
  color?: TLabelColor;
  variant?: TLabelVariant;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}
