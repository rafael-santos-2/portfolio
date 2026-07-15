import type { IFirestoreDefault } from "./default.type";
import { FIRESTORE_DEFAULT } from "./default.type";

export type TNotificationType = "info" | "success" | "warning" | "error" | "system" | "update" | "message";
export type TNotificationPriority = "low" | "medium" | "high" | "urgent";
export type TNotificationActionType = "primary" | "secondary" | "danger";
export type TNotificationActionBehavior = "navigate" | "dismiss";



export interface INotificationAction {
  id: string;
  label: string;
  type: TNotificationActionType;
  behavior: TNotificationActionBehavior;
  href?: string;
}

export interface INotificationLink {
  label: string;
  href?: string;
  collection?: string;
  document_id?: string;
}

export interface INotification extends IFirestoreDefault {
  // Core
  title: string;
  title_key?: string;
  title_params?: Record<string, string | number>;
  description: string;
  description_key?: string;
  description_params?: Record<string, string | number>;
  content?: string;

  // Type & visual
  type: TNotificationType;

  // Status
  is_read: boolean;
  date_read: Date | null;
  is_archived: boolean;
  date_archived: Date | null;

  // Sender
  sender: string | null;

  // Navigation
  link?: INotificationLink;

  // Quick actions
  actions?: INotificationAction[];

  // Priority & timing
  priority?: TNotificationPriority;
  expires_at?: Date | null;

  // Grouping
  group?: string;
  tags?: string[];

  // Push notification
  is_push_notification?: boolean;
  is_push_sent?: boolean;
}

export const NOTIFICATION_DEFAULT: INotification = {
  title: "",
  description: "",
  content: undefined,
  type: "info",
  is_read: false,
  date_read: null,
  is_archived: false,
  date_archived: null,
  sender: null,
  link: undefined,
  actions: undefined,
  priority: undefined,
  expires_at: undefined,
  group: undefined,
  tags: undefined,
  is_push_notification: undefined,
  is_push_sent: undefined,
  ...FIRESTORE_DEFAULT,
}
