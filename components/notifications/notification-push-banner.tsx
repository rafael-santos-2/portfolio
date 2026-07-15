'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, CircularProgress } from '@mui/material';
import { usePushNotifications } from '@/hooks/use-push-notifications';
import { useAuthContext } from '@/providers/authentication/context-authentication';
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function NotificationPushBanner(): JSX.Element | null {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { permission, is_loading, is_supported, error, request_permission } = usePushNotifications(user?.id ?? null);


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  if (!is_supported)          return null;
  if (permission === 'granted') return null;
  if (permission === 'denied')  return null;

  return (
    <Alert
      severity="info"
      action={
        <Button
          size="small"
          color="inherit"
          onClick={request_permission}
          disabled={is_loading}
          startIcon={is_loading ? <CircularProgress size={14} color="inherit" /> : undefined}
        >
          {t('notifications.push.enable')}
        </Button>
      }
    >
      {error ? t('notifications.push.error') : t('notifications.push.banner')}
    </Alert>
  );

}
// ----------------------------------------------------------------------------------------------------
