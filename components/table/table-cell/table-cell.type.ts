// TYPES
// ----------------------------------------------------------------------------------------------------

import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material';


export interface ITableCellProps extends Omit<TableCellProps, 'children'> {
  children?: ReactNode;
  loading?: boolean;
  emptyLabel?: string;
}
