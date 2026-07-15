// TYPES
// ----------------------------------------------------------------------------------------------------

import { ReactNode } from 'react';


export interface IInfoItemProps {
  title?: string;
  value?: string | number | ReactNode | null;
  valueColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  loading?: boolean;
  emptyLabel?: string;
  onClick?: () => void;
  copyable?: boolean;
}
