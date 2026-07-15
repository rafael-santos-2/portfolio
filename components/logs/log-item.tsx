'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { ILog } from '@/types/database';
import LogIcon, { LOG_SEVERITY_COLOR } from './log-icon';


// TYPES
// ----------------------------------------------------------------------------------------------------

type TProps = {
  log: ILog;
};


// HELPERS
// ----------------------------------------------------------------------------------------------------

function format_relative_time(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60)    return `${diff}s`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function LogItem({ log }: TProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslation();
  const color = LOG_SEVERITY_COLOR[log.severity];


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function get_message(): string {
    if (log.description_key) return t(log.description_key, log.description_params ?? {});
    return log.description;
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        px: 2,
        py: 1.5,
        borderLeft: `3px solid ${color}`,
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >

      {/* Icon */}
      <Box sx={{ pt: 0.25 }}>
        <LogIcon action={log.action} severity={log.severity} size={20} />
      </Box>

      {/* Content */}
      <Stack flex={1} spacing={0.5} minWidth={0}>

        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
          <Typography variant="body2" fontWeight={500} noWrap sx={{ flex: 1 }}>
            {get_message()}
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
            {format_relative_time(log.date_created)}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">

          {/* Action */}
          <Typography variant="caption" color="text.disabled">
            {t(`log.action.${log.action}`)}
          </Typography>

          {/* Resource */}
          {log.resource_type && (
            <>
              <Typography variant="caption" color="text.disabled">·</Typography>
              <Typography variant="caption" color="text.secondary">
                {log.resource_label ?? log.resource_id ?? log.resource_type}
              </Typography>
            </>
          )}

          {/* Actor */}
          {log.label_user && (
            <>
              <Typography variant="caption" color="text.disabled">·</Typography>
              <Typography variant="caption" color="text.secondary">
                {log.label_user}
              </Typography>
            </>
          )}

        </Stack>

        {/* Tags */}
        {log.tags && log.tags.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={0.25}>
            {log.tags.map(tag => (
              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem' }} />
            ))}
          </Stack>
        )}

      </Stack>

    </Stack>
  );

}
