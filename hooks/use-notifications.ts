'use client';
// TO DO
// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { useMemo, useState } from 'react';
import { useNotificationsContext } from '@/providers/notifications/context-notifications';
import type { INotification, TNotificationType } from '@/types/database';


// TYPES
// ----------------------------------------------------------------------------------------------------
export type TNotificationFilter = "all" | "unread" | TNotificationType;

export type TUseNotificationsReturn = {
  // Data
  notifications: INotification[];
  all_notifications: INotification[];
  unread_count: number;
  is_loading: boolean;

  // Filters
  filter: TNotificationFilter;
  onSetFilter: (filter: TNotificationFilter) => void;

  // Actions
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
};


// HOOK
// ----------------------------------------------------------------------------------------------------
export function useNotifications(): TUseNotificationsReturn {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const ctx = useNotificationsContext();


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [filter, setFilter] = useState<TNotificationFilter>("all");


  // COMPUTED
  // ----------------------------------------------------------------------------------------------------

  const notifications = useMemo(() => {
    if (filter === "all") return ctx.notifications;
    if (filter === "unread") return ctx.notifications.filter(n => !n.is_read);
    return ctx.notifications.filter(n => n.type === filter);
  }, [ctx.notifications, filter]);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  function onSetFilter(f: TNotificationFilter) {
    setFilter(f);
  }


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return {
    notifications,
    all_notifications: ctx.notifications,
    unread_count: ctx.unread_count,
    is_loading: ctx.is_loading,
    filter,
    onSetFilter,
    onMarkRead: ctx.onMarkRead,
    onMarkAllRead: ctx.onMarkAllRead,
    onArchive: ctx.onArchive,
    onDelete: ctx.onDelete,
  };

}
