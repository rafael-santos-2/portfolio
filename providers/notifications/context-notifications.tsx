'use client';

// IMPORTS
// -----------------------------------------------------------------------------------------
import { INotification } from '@/types/database';
import { createContext, useContext } from 'react';
// -----------------------------------------------------------------------------------------


// CONTEXT
// -----------------------------------------------------------------------------------------
export const ContextNotifications = createContext<{

  notifications: INotification[];
  unread_count: number;
  is_loading: boolean;

  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;

}>({

  notifications: [],
  unread_count: 0,
  is_loading: true,

  onMarkRead: () => {},
  onMarkAllRead: () => {},
  onArchive: () => {},
  onDelete: () => {},

});
// -----------------------------------------------------------------------------------------

export function useNotificationsContext() {
  return useContext(ContextNotifications);
}
