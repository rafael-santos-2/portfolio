'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useEffect, useState } from 'react';
import { INotification } from '@/types/database';
import { useAuthContext } from '@/providers/authentication/context-authentication';
import {
  archive_notification,
  delete_notification,
  mark_all_notifications_read,
  mark_notification_read,
  stream_notifications,
} from '@/database/users/notifications/notifications';
import { ContextNotifications } from './context-notifications';
// ----------------------------------------------------------------------------------------------------


// TYPES
// ----------------------------------------------------------------------------------------------------
type TProps = {
  children: React.ReactNode;
};
// ----------------------------------------------------------------------------------------------------


// PROVIDER
// ----------------------------------------------------------------------------------------------------
export default function ProviderNotifications({ children }: TProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { user, is_authenticated } = useAuthContext();


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [is_loading, setIsLoading] = useState<boolean>(is_authenticated && !!user);


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {

    if (!is_authenticated || !user) return;

    const unsub = stream_notifications(user.id, (data) => {
      setNotifications(data);
      setIsLoading(false);
    });

    return () => {
      unsub();
      setNotifications([]);
      setIsLoading(false);
    };

  }, [is_authenticated, user]);


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  const unread_count = notifications.filter(n => !n.is_read).length;


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  async function onMarkRead(id: string) {
    if (!user?.id) return;
    await mark_notification_read(user.id, id).catch(console.error);
  }

  async function onMarkAllRead() {
    if (!user?.id) return;
    await mark_all_notifications_read(user.id, notifications).catch(console.error);
  }

  async function onArchive(id: string) {
    if (!user?.id) return;
    await archive_notification(user.id, id).catch(console.error);
  }

  async function onDelete(id: string) {
    if (!user?.id) return;
    await delete_notification(user.id, id).catch(console.error);
  }


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <ContextNotifications.Provider value={{
      notifications,
      unread_count,
      is_loading,
      onMarkRead,
      onMarkAllRead,
      onArchive,
      onDelete,
    }}>
      {children}
    </ContextNotifications.Provider>
  );

}
// ----------------------------------------------------------------------------------------------------
