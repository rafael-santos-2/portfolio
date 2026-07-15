'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { Skeleton, TableCell as MuiTableCell, Typography } from '@mui/material';

import { useTranslate } from '@/providers/language';

import type { ITableCellProps } from './table-cell.type';


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function TableCell({
  children,
  loading,
  emptyLabel,
  ...other
}: ITableCellProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslate();

  const isEmpty = children === null || children === undefined || children === '';


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  function renderContent() {

    if (loading) {
      return <Skeleton variant="text" />;
    }

    if (isEmpty) {
      return (
        <Typography variant="inherit" color="text.disabled" fontStyle="italic">
          {emptyLabel ?? t('components.tableCell.empty')}
        </Typography>
      );
    }

    return children;
  }

  return (
    <MuiTableCell {...other}>
      {renderContent()}
    </MuiTableCell>
  );

}
