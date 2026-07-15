// IMPORTS
// ------------------------------------------------------------------------------
import { INotification, IQuery } from "@/types/database";
import { collection, doc, onSnapshot, query, Unsubscribe, updateDoc, where, orderBy, serverTimestamp, setDoc } from "firebase/firestore";
import { FIRESTORE } from "@/config/firebase/client";
import { convertor, query_builder } from "@/utils/firebase";
// ------------------------------------------------------------------------------


// CONFIG
// ------------------------------------------------------------------------------
const COLLECTION_USERS = "users";
const COLLECTION_NOTIFICATIONS = "notifications";

function notifications_ref(id_user: string) {
  return collection(FIRESTORE, `${COLLECTION_USERS}/${id_user}/${COLLECTION_NOTIFICATIONS}`);
}
// ------------------------------------------------------------------------------


// CREATE NOTIFICATION
// ------------------------------------------------------------------------------
export async function create_notification(id_user: string, notification: Omit<INotification, 'id' | 'id_creator' | 'id_updater' | 'id_deleter' | 'date_updated' | 'date_deleted' | 'is_deleted'>): Promise<void> {
  try {

    if (!id_user) { throw "No user id was given." }

    const REF = doc(notifications_ref(id_user));
    await setDoc(REF, {
      ...notification,
      id: REF.id,
      id_creator: id_user,
      id_updater: null,
      id_deleter: null,
      date_created: serverTimestamp(),
      date_updated: null,
      date_deleted: null,
      is_deleted: false,
    });

  } catch (error) {

    console.error(`[CREATE] (notification) Cannot create notification.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// STREAM NOTIFICATIONS
// ------------------------------------------------------------------------------
export function stream_notifications(id_user: string, callback: (notifications: INotification[]) => void, options: IQuery | null = null): Unsubscribe {
  try {

    const COL = notifications_ref(id_user);
    const QUERY = query(
      COL,
      where("is_deleted", "==", false),
      where("is_archived", "==", false),
      orderBy("date_created", "desc"),
      ...query_builder(options),
    );
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => { callback(resp.docs.map(doc => convertor<INotification>({ ...doc.data(), id: doc.id }))); },
      (err) => { throw err; }
    );
    return SNAPSHOT;

  } catch (error) {

    console.error(`[STREAM] (notifications) Cannot stream notifications from database.`, error);
    callback([]);
    return () => {};

  }
}
// ------------------------------------------------------------------------------


// MARK AS READ
// ------------------------------------------------------------------------------
export async function mark_notification_read(id_user: string, id_notification: string): Promise<void> {
  try {

    if (!id_user) { throw "No user id was given." }
    if (!id_notification) { throw "No notification id was given." }

    const REF = doc(FIRESTORE, `${COLLECTION_USERS}/${id_user}/${COLLECTION_NOTIFICATIONS}/${id_notification}`);
    await updateDoc(REF, {
      is_read: true,
      date_read: serverTimestamp(),
      date_updated: serverTimestamp(),
    });

  } catch (error) {

    console.error(`[UPDATE] (notification) Cannot mark notification as read.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// MARK ALL AS READ
// ------------------------------------------------------------------------------
export async function mark_all_notifications_read(id_user: string, notifications: INotification[]): Promise<void> {
  try {

    if (!id_user) { throw "No user id was given." }

    const unread = notifications.filter(n => !n.is_read);
    await Promise.all(unread.map(n => mark_notification_read(id_user, n.id)));

  } catch (error) {

    console.error(`[UPDATE] (notifications) Cannot mark all notifications as read.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// ARCHIVE NOTIFICATION
// ------------------------------------------------------------------------------
export async function archive_notification(id_user: string, id_notification: string): Promise<void> {
  try {

    if (!id_user) { throw "No user id was given." }
    if (!id_notification) { throw "No notification id was given." }

    const REF = doc(FIRESTORE, `${COLLECTION_USERS}/${id_user}/${COLLECTION_NOTIFICATIONS}/${id_notification}`);
    await updateDoc(REF, {
      is_archived: true,
      date_archived: serverTimestamp(),
      date_updated: serverTimestamp(),
    });

  } catch (error) {

    console.error(`[UPDATE] (notification) Cannot archive notification.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// DELETE NOTIFICATION (SOFT)
// ------------------------------------------------------------------------------
export async function delete_notification(id_user: string, id_notification: string): Promise<void> {
  try {

    if (!id_user) { throw "No user id was given." }
    if (!id_notification) { throw "No notification id was given." }

    const REF = doc(FIRESTORE, `${COLLECTION_USERS}/${id_user}/${COLLECTION_NOTIFICATIONS}/${id_notification}`);
    await updateDoc(REF, {
      is_deleted: true,
      date_deleted: serverTimestamp(),
      date_updated: serverTimestamp(),
    });

  } catch (error) {

    console.error(`[DELETE] (notification) Cannot delete notification.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------
