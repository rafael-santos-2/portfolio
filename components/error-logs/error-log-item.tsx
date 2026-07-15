'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Chip, Collapse, IconButton, Typography } from '@mui/material';
import { ILog, TErrorLogType } from '@/types/database';
import { get_error_type } from '@/hooks/use-error-logs';
import Icon from '@/components/icon';
import css from './error-log-item.module.css';
// ----------------------------------------------------------------------------------------------------


// TYPES
// ----------------------------------------------------------------------------------------------------
type TProps = {
  error_log: ILog;
};
// ----------------------------------------------------------------------------------------------------


// HELPERS
// ----------------------------------------------------------------------------------------------------
const ERROR_TYPE_COLOR: Record<TErrorLogType, string> = {
  unhandled_exception: 'var(--palette-error-main)',
  unhandled_rejection: 'var(--palette-error-main)',
  react_boundary:      'var(--palette-warning-main)',
  manual:              'var(--palette-info-main)',
};

const ERROR_TYPE_LABEL: Record<TErrorLogType, string> = {
  unhandled_exception: 'Exception',
  unhandled_rejection: 'Rejection',
  react_boundary:      'React boundary',
  manual:              'Manual',
};

function format_relative_time(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60)    return `${diff}s`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function Error_log_item({ error_log }: TProps): JSX.Element {


  // GLOBALS
  // ----------------------------------------------------------------------------------------------------
  const error_type = get_error_type(error_log);
  const color      = ERROR_TYPE_COLOR[error_type];


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [is_expanded, set_is_expanded] = useState<boolean>(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handle_toggle_expand() {
    set_is_expanded(prev => !prev);
  }


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div className={css.item} style={{ borderLeftColor: color }}>

      {/* Icon */}
      <div className={css.icon} style={{ color }}>
        <Icon name="alert-circle" size={18} />
      </div>

      {/* Content */}
      <div className={css.content}>

        {/* Header */}
        <div className={css.header}>
          <Typography variant="body2" fontWeight={500} className={css.message}>
            {error_log.name}: {error_log.description}
          </Typography>
          <Typography variant="caption" color="text.disabled" className={css.time}>
            {format_relative_time(error_log.date_created)}
          </Typography>
        </div>

        {/* Meta */}
        <div className={css.meta}>

          <Chip
            label={ERROR_TYPE_LABEL[error_type]}
            size="small"
            sx={{ height: 16, fontSize: '0.6rem', bgcolor: `${color}22`, color }}
          />

          {error_log.metadata?.url && (
            <Typography variant="caption" color="text.disabled">
              {error_log.metadata.url as string}
            </Typography>
          )}

          {error_log.environment && (
            <>
              <Typography variant="caption" color="text.disabled">·</Typography>
              <Typography variant="caption" color="text.disabled">
                {error_log.environment}{error_log.app_version ? ` v${error_log.app_version}` : ''}
              </Typography>
            </>
          )}

          {error_log.label_user && (
            <>
              <Typography variant="caption" color="text.disabled">·</Typography>
              <Typography variant="caption" color="text.secondary">
                {error_log.label_user}
              </Typography>
            </>
          )}

        </div>

        {/* Detail section */}
        <Collapse in={is_expanded}>
          <div className={css.detail}>

            { !!error_log.metadata?.stack && (
              <div className={css.detail_section}>
                <Typography variant="caption" color="text.disabled" fontWeight={600}>Stack trace</Typography>
                <pre className={css.stack_trace}>{error_log.metadata.stack as string}</pre>
              </div>
            )}

            <div className={css.divider} />

            {/* Browser context */}
            <div className={css.context_grid}>
              {[
                { label: 'Platform', value: error_log.metadata?.platform },
                { label: 'Viewport', value: error_log.metadata?.viewport },
                { label: 'User agent', value: error_log.metadata?.agent },
              ].map(({ label, value }) => value ? (
                <div key={label} className={css.context_cell}>
                  <Typography variant="caption" color="text.disabled" fontWeight={600}>{label}</Typography>
                  <Typography variant="caption" color="text.secondary">{value as string}</Typography>
                </div>
              ) : null)}
            </div>

            {/* Extra metadata */}
            {error_log.metadata && Object.keys(error_log.metadata).length > 0 && (
              <div className={css.detail_section}>
                <Typography variant="caption" color="text.disabled" fontWeight={600}>Metadata</Typography>
                <pre className={css.stack_trace}>{JSON.stringify(error_log.metadata, null, 2)}</pre>
              </div>
            )}

          </div>
        </Collapse>

      </div>

      {/* Expand toggle */}
      <div className={css.toggle}>
        <IconButton size="small" onClick={handle_toggle_expand}>
          <Icon name={is_expanded ? 'chevron-up' : 'chevron-down'} size={16} />
        </IconButton>
      </div>

    </div>
  );

}
// ----------------------------------------------------------------------------------------------------
