'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Box, Button, Chip, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { INotification } from '@/types/database';
import NotificationItem from '@/components/notifications/notification-item';
import NotificationPushBanner from '@/components/notifications/notification-push-banner';
import Header from '@/components/header/header';
import { useAuthContext } from '@/providers/authentication/context-authentication';
import { usePushNotifications } from '@/hooks/use-push-notifications';
import { useApp } from '@/providers/app/context-app';
import Icon from '@/components/icon';
import { create_notification } from '@/database/users/notifications/notifications';


// DATA
// ----------------------------------------------------------------------------------------------------
const BASE = { id_creator: null, id_updater: null, id_deleter: null, date_updated: null, is_deleted: false, date_deleted: null };

const DUMMY_NOTIFICATIONS: INotification[] = [
  {
    ...BASE,
    id: 'n1',
    title: 'New team member added',
    description: 'Jan Janssen has been added to the Admin role.',
    type: 'info',
    is_read: false,
    date_read: null,
    is_archived: false,
    date_archived: null,
    sender: null,
    date_created: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    ...BASE,
    id: 'n2',
    title: 'Payment failed',
    description: 'The payment for order #42 could not be processed. Please check your billing details.',
    type: 'error',
    is_read: false,
    date_read: null,
    is_archived: false,
    date_archived: null,
    sender: null,
    tags: ['billing'],
    date_created: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    ...BASE,
    id: 'n3',
    title: 'Export completed',
    description: 'Your Q1 2025 report has been exported successfully.',
    type: 'success',
    is_read: true,
    date_read: new Date(),
    is_archived: false,
    date_archived: null,
    sender: null,
    date_created: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    ...BASE,
    id: 'n4',
    title: 'Scheduled maintenance',
    description: 'The system will be under maintenance on Sunday from 02:00 to 04:00.',
    type: 'warning',
    is_read: false,
    date_read: null,
    is_archived: false,
    date_archived: null,
    sender: null,
    tags: ['system'],
    date_created: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    ...BASE,
    id: 'n5',
    title: 'New message from Lien Pieters',
    description: 'Can you review the NDA document before Friday?',
    type: 'message',
    is_read: true,
    date_read: new Date(),
    is_archived: false,
    date_archived: null,
    sender: 'Lien Pieters',
    date_created: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];


// PERMISSION COLORS
// ----------------------------------------------------------------------------------------------------
const PERMISSION_COLOR: Record<string, 'default' | 'success' | 'error'> = {
  default: 'default',
  granted: 'success',
  denied: 'error',
};
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsNotifications(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { user } = useAuthContext();
  const { size_screen } = useApp();
  const { permission, token, is_loading, is_supported, error, request_permission, revoke_permission } = usePushNotifications(user?.id ?? null);


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [notifications, setNotifications] = useState<INotification[]>(DUMMY_NOTIFICATIONS);
  const [is_sending_push, set_is_sending_push] = useState<boolean>(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function handle_mark_read(id: string) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true, date_read: new Date() } : n));
  }

  function handle_archive(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function handle_delete(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  async function handle_send_test_push(): Promise<void> {
    if (!user?.id) return;
    set_is_sending_push(true);
    try {
      await create_notification(user.id, {
        title: 'Test push notification',
        description: 'This is a test push notification sent from the component library.',
        type: 'info',
        is_read: false,
        date_read: null,
        is_archived: false,
        date_archived: null,
        sender: null,
        is_push_notification: true,
        is_push_sent: false,
        date_created: new Date(),
      });
    } catch (err) {
      console.error('[TEST] Failed to send test push:', err);
    } finally {
      set_is_sending_push(false);
    }
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Notifications" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack
          direction={size_screen === 'sm' ? 'column' : 'row'}
          spacing={4}
          alignItems="flex-start"
        >

          {/* NOTIFICATION ITEMS */}
          {/* ---------------------------------------------------------------- */}
          <Stack spacing={1.5} sx={{ width: size_screen === 'sm' ? '100%' : 480, flexShrink: 0 }}>
            <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" letterSpacing={1}>
              Notification items
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>

              <Stack sx={{ px: 2, py: 1.5 }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notifications.filter((n) => !n.is_read).length} unread
                </Typography>
              </Stack>

              <Divider />

              {notifications.length === 0 ? (
                <Stack sx={{ p: 4 }} alignItems="center">
                  <Typography variant="body2" color="text.secondary">No notifications</Typography>
                </Stack>
              ) : (
                notifications.map((n, i) => (
                  <div key={n.id}>
                    <NotificationItem
                      notification={n}
                      onMarkRead={handle_mark_read}
                      onArchive={handle_archive}
                      onDelete={handle_delete}
                      onClose={() => {}}
                    />
                    {i < notifications.length - 1 && <Divider />}
                  </div>
                ))
              )}

            </Box>
          </Stack>

          {/* PUSH NOTIFICATIONS */}
          {/* ---------------------------------------------------------------- */}
          <Stack spacing={1.5} sx={{ width: size_screen === 'sm' ? '100%' : 480, flexShrink: 0 }}>
            <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" letterSpacing={1}>
              Push notifications
            </Typography>

            {/* Banner component */}
            <NotificationPushBanner />

            {/* Status & controls */}
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>

              <Stack sx={{ px: 2, py: 1.5 }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={600}>Status</Typography>
                <Chip
                  size="small"
                  label={permission}
                  color={PERMISSION_COLOR[permission]}
                  variant={permission === 'default' ? 'outlined' : 'filled'}
                />
              </Stack>

              <Divider />

              <Stack spacing={2} sx={{ p: 2 }}>

                {/* Supported */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack spacing={0.25}>
                    <Typography variant="body2" fontWeight={500}>Browser support</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Is push notification supported in deze browser?
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label={is_supported ? 'supported' : 'not supported'}
                    color={is_supported ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Stack>

                <Divider />

                {/* FCM Token */}
                <Stack spacing={0.25}>
                  <Typography variant="body2" fontWeight={500}>FCM Token</Typography>
                  <Typography
                    variant="caption"
                    color={token ? 'text.secondary' : 'text.disabled'}
                    sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}
                  >
                    {token ? token : '—'}
                  </Typography>
                </Stack>

                {error && (
                  <Typography variant="caption" color="error.main">
                    {error}
                  </Typography>
                )}

                <Divider />

                {/* Buttons */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!is_supported || permission === 'granted' || permission === 'denied' || is_loading}
                    onClick={request_permission}
                    startIcon={<Icon name="bell" size={16} />}
                  >
                    Toestemming vragen
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    disabled={!token || is_loading}
                    onClick={revoke_permission}
                    startIcon={<Icon name="ban" size={16} />}
                  >
                    Token verwijderen
                  </Button>
                </Stack>

                {permission === 'denied' && (
                  <Typography variant="caption" color="warning.main">
                    Push notificaties zijn geblokkeerd in de browser. Pas dit aan via de site-instellingen van de browser.
                  </Typography>
                )}

                <Divider />

                {/* Send test push */}
                <Stack spacing={0.5}>
                  <Typography variant="body2" fontWeight={500}>Test push notification</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Schrijft een notification naar Firestore met <code>is_push_notification: true</code>. De Cloud Function verstuurt daarna de push naar alle geregistreerde tokens van deze gebruiker.
                  </Typography>
                  <Box sx={{ pt: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      disabled={!token || is_sending_push}
                      onClick={handle_send_test_push}
                      startIcon={is_sending_push ? <CircularProgress size={14} color="inherit" /> : <Icon name="test-tube" size={16} />}
                    >
                      {is_sending_push ? 'Verzenden...' : 'Stuur test push'}
                    </Button>
                  </Box>
                </Stack>

              </Stack>
            </Box>
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
