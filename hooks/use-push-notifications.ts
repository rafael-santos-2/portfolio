'use client';

import { get_fcm_token, get_firebase_messaging, onMessage } from "@/config/firebase/messaging";
import { delete_fcm_token, save_fcm_token } from "@/database/users/fcm-tokens/fcm-tokens";
import { useEffect, useState } from "react";

type TPushPermission = 'default' | 'granted' | 'denied';

export function usePushNotifications(id_user:string|null) {

  const [ permission, set_permission ] = useState<TPushPermission>('default');
  const [ token, set_token ] = useState<string|null>(null);
  const [ is_loading, set_is_loading ] = useState<boolean>(false);
  const [ error, set_error ] = useState<string|null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser Notification.permission on mount
      set_permission(Notification.permission as TPushPermission);

      // Als toestemming al granted is, haal het bestaande token op
      if (Notification.permission === 'granted') {
        get_fcm_token().then((existing_token) => {
          if (existing_token) set_token(existing_token);
        });
      }
    }
  }, []);

  useEffect(() => {
    const m = get_firebase_messaging();
    if (!m) return;

    const unsub = onMessage(m, (payload) => {
      console.info('[FCM] Foreground message:', payload);
      // Eventueel hier een notificatie in de app laten zien
    })

    return () => unsub();
  }, []);

  async function request_permission(): Promise<void> {
    if (!id_user) return;

    set_is_loading(true);
    set_error(null);

    try {
      const result = await Notification.requestPermission();
      set_permission(result as TPushPermission);

      if (result === "granted") {
        const fcm_token =  await get_fcm_token();
        if (fcm_token) {
          set_token(fcm_token);
          await save_fcm_token(id_user, fcm_token);
          console.info('[FCM] Token saved:', fcm_token.slice(0,20) + '...');
        }
      }
    } catch (err) {
      set_error('notifications.push.error');
      console.error('[FCM] Permission error:', err);
    } finally {
      set_is_loading(false);
    }
  }

  async function revoke_permission(): Promise<void> {
    if (!id_user || !token) return;
    await delete_fcm_token(id_user, token);
    set_token(null);
  }

  return {
    permission,
    token,
    is_loading,
    error,
    is_supported: typeof window !== 'undefined' && 'Notification' in window,
    request_permission,
    revoke_permission,
  }

}