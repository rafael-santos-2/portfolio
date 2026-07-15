'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from 'react';
import { Skeleton, Tooltip, Typography } from '@mui/material';

import { useTranslate } from '@/providers/language';

import type { IInfoItemProps } from './info-item.type';
import css from './info-item.module.css';
import Icon from '@/components/icon';


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function InfoItem({
  title,
  value,
  valueColor,
  loading,
  emptyLabel,
  onClick,
  copyable,
}: IInfoItemProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslate();

  const isEmpty = value === null || value === undefined || value === '';
  const isReactNode = !isEmpty && typeof value !== 'string' && typeof value !== 'number';
  const color = valueColor ? `${valueColor}.main` : 'text.primary';


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [copied, setCopied] = useState(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function handleCopy() {
    if (typeof value !== 'string' && typeof value !== 'number') return;
    navigator.clipboard.writeText(String(value)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  function renderValue() {

    if (loading) {
      return <Skeleton variant="text" width={120} sx={{ fontSize: '1rem' }} />;
    }

    if (isEmpty) {
      return (
        <Typography variant="body1" color="text.disabled">
          {emptyLabel ?? t('components.infoItem.empty')}
        </Typography>
      );
    }

    if (isReactNode) {
      return <>{value}</>;
    }

    if (onClick) {
      return (
        <Typography
          variant="body1"
          color={color}
          className={`${css.value} ${css.clickable}`}
          onClick={onClick}
        >
          {value}
        </Typography>
      );
    }

    if (copyable) {
      return (
        <Tooltip title={copied ? t('components.infoItem.copied') : t('components.infoItem.copy')} placement="right">
          <Typography
            variant="body1"
            color={color}
            className={`${css.value} ${css.copyable}`}
            onClick={handleCopy}
          >
            {value}
            <span className={css.copyIcon}>
              <Icon name="copy" />
            </span>
          </Typography>
        </Tooltip>
      );
    }

    return (
      <Typography variant="body1" color={color} className={css.value}>
        {value}
      </Typography>
    );
  }

  return (
    <div className={css.infoItem}>
      {title && (
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
      )}
      {renderValue()}
    </div>
  );

}
