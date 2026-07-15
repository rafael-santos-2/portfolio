'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Box, Button, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useNotifications } from '@/hooks/use-notifications';
import NotificationItem from './notification-item';
import { TNotificationFilter } from '@/hooks/use-notifications';


// TYPES
// ----------------------------------------------------------------------------------------------------

type TProps = {
  onClose: () => void;
};

type TTab = {
  value: TNotificationFilter;
  label: string;
  count?: number;
};


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function NotificationPanel({ onClose }: TProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslation();
  const {
    notifications,
    all_notifications,
    unread_count,
    is_loading,
    filter,
    onSetFilter,
    onMarkRead,
    onMarkAllRead,
    onArchive,
    onDelete,
  } = useNotifications();


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  const tabs: TTab[] = [
    { value: 'all',     label: t('notifications.tabs.all'),     count: all_notifications.length },
    { value: 'unread',  label: t('notifications.tabs.unread'),  count: unread_count },
    { value: 'info',    label: t('notifications.tabs.info') },
    { value: 'warning', label: t('notifications.tabs.warning') },
    { value: 'error',   label: t('notifications.tabs.error') },
  ];


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <Stack sx={{ width: 380, maxHeight: '80vh', overflow: 'hidden' }}>

      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6">{t('notifications.title')}</Typography>
          {unread_count > 0 && (
            <Badge badgeContent={unread_count} color="error" sx={{ '& .MuiBadge-badge': { position: 'relative', transform: 'none' } }} />
          )}
        </Stack>
        {unread_count > 0 && (
          <Button size="small" variant="text" onClick={onMarkAllRead} sx={{ fontSize: '0.75rem' }}>
            {t('notifications.markAllAsRead')}
          </Button>
        )}
      </Stack>

      <Divider />

      {/* Tabs */}
      <Tabs
        value={filter}
        onChange={(_, v) => onSetFilter(v as TNotificationFilter)}
        variant="scrollable"
        scrollButtons={false}
        sx={{ minHeight: 40, px: 1, '& .MuiTab-root': { minHeight: 40, py: 0, fontSize: '0.75rem' } }}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              tab.count !== undefined && tab.count > 0
                ? `${tab.label} (${tab.count})`
                : tab.label
            }
          />
        ))}
      </Tabs>

      <Divider />

      {/* List */}
      <Box sx={{ overflowY: 'auto', flex: 1 }}>

        {is_loading && (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 6 }}>
            <Typography variant="body2" color="text.disabled">{t('general.loading')}</Typography>
          </Stack>
        )}

        {!is_loading && notifications.length === 0 && (
          <Stack alignItems="center" justifyContent="center" spacing={1} sx={{ py: 6 }}>
            <Typography variant="body2" color="text.disabled">{t('notifications.empty')}</Typography>
          </Stack>
        )}

        {!is_loading && notifications.map((notification, index) => (
          <Box key={notification.id}>
            <NotificationItem
              notification={notification}
              onMarkRead={onMarkRead}
              onArchive={onArchive}
              onDelete={onDelete}
              onClose={onClose}
            />
            {index < notifications.length - 1 && <Divider />}
          </Box>
        ))}

      </Box>

    </Stack>
  );

}
