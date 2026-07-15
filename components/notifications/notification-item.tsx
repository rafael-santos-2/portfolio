'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Box, Button, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { INotification } from '@/types/database';
import Icon from '@/components/icon';
import NotificationIcon, { NOTIFICATION_TYPE_COLOR } from './notification-icon';


// TYPES
// ----------------------------------------------------------------------------------------------------

type TProps = {
  notification: INotification;
  onMarkRead: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};


// HELPERS
// ----------------------------------------------------------------------------------------------------

function format_relative_time(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60)   return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function NotificationItem({ notification, onMarkRead, onArchive, onDelete, onClose }: TProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslation();
  const router = useRouter();
  const color = NOTIFICATION_TYPE_COLOR[notification.type];


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function handle_click() {
    if (!notification.is_read) {
      onMarkRead(notification.id);
    }
  }

  function handle_action_click(e: React.MouseEvent, href?: string) {
    e.stopPropagation();
    if (!notification.is_read) onMarkRead(notification.id);
    if (href) {
      router.push(href);
      onClose();
    }
  }

  function handle_archive(e: React.MouseEvent) {
    e.stopPropagation();
    onArchive(notification.id);
  }

  function handle_delete(e: React.MouseEvent) {
    e.stopPropagation();
    onDelete(notification.id);
  }

  function get_title(): string {
    if (notification.title_key) return t(notification.title_key, notification.title_params ?? {});
    return notification.title;
  }

  function get_description(): string {
    if (notification.description_key) return t(notification.description_key, notification.description_params ?? {});
    return notification.description;
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <Stack
      direction="row"
      spacing={1.5}
      onClick={handle_click}
      sx={{
        px: 2,
        py: 1.5,
        cursor: notification.is_read ? 'default' : 'pointer',
        bgcolor: notification.is_read ? 'transparent' : 'action.hover',
        borderLeft: `3px solid ${notification.is_read ? 'transparent' : color}`,
        transition: 'background-color 0.15s ease',
        '&:hover': { bgcolor: 'action.hover' },
        '&:hover .notification-actions': { opacity: 1 },
        position: 'relative',
      }}
    >

      {/* Icon */}
      <Box sx={{ pt: 0.25 }}>
        <NotificationIcon type={notification.type} size={20} />
      </Box>

      {/* Content */}
      <Stack flex={1} spacing={0.5} minWidth={0}>

        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
          <Typography
            variant="body2"
            fontWeight={notification.is_read ? 400 : 600}
            noWrap
            sx={{ flex: 1 }}
          >
            {get_title()}
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
            {format_relative_time(notification.date_created)}
          </Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {get_description()}
        </Typography>

        {/* Markdown content */}
        {notification.content && (
          <Box
            sx={{
              mt: 0.5,
              p: 1,
              bgcolor: 'background.neutral',
              borderRadius: 1,
              fontSize: '0.75rem',
              color: 'text.secondary',
              '& p': { m: 0 },
              '& strong': { color: 'text.primary' },
            }}
          >
            <Typography variant="caption" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
              {notification.content}
            </Typography>
          </Box>
        )}

        {/* Link */}
        {notification.link && (
          <Box>
            <Button
              size="small"
              variant="text"
              sx={{ p: 0, minWidth: 0, fontSize: '0.7rem', color: color }}
              onClick={(e) => handle_action_click(e, notification.link?.href)}
            >
              {notification.link.label} →
            </Button>
          </Box>
        )}

        {/* Quick actions */}
        {notification.actions && notification.actions.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={0.5}>
            {notification.actions.map((action) => (
              <Button
                key={action.id}
                size="small"
                variant={action.type === 'primary' ? 'contained' : 'outlined'}
                color={action.type === 'danger' ? 'error' : action.type === 'primary' ? 'primary' : 'inherit'}
                sx={{ fontSize: '0.7rem', py: 0.25, px: 1, minWidth: 0 }}
                onClick={(e) => handle_action_click(e, action.behavior === 'navigate' ? action.href : undefined)}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        )}

        {/* Tags / group */}
        {(notification.group || notification.tags?.length) && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={0.25}>
            {notification.group && (
              <Chip label={notification.group} size="small" sx={{ height: 16, fontSize: '0.6rem' }} />
            )}
            {notification.tags?.map(tag => (
              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ height: 16, fontSize: '0.6rem' }} />
            ))}
          </Stack>
        )}

      </Stack>

      {/* Hover actions */}
      <Stack
        className="notification-actions"
        direction="row"
        spacing={0}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          opacity: 0,
          transition: 'opacity 0.15s ease',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {!notification.is_read && (
          <Tooltip title={t('notifications.markAsRead')} placement="top">
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onMarkRead(notification.id); }}>
              <Icon name="check-circle" size={14} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={t('notifications.archive')} placement="top">
          <IconButton size="small" onClick={handle_archive}>
            <Icon name="ban" size={14} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('notifications.delete')} placement="top">
          <IconButton size="small" onClick={handle_delete} color="error">
            <Icon name="trash" size={14} />
          </IconButton>
        </Tooltip>
      </Stack>

    </Stack>
  );

}
