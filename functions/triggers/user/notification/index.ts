// IMPORTS
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------

import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FirestoreAuthEvent, onDocumentCreatedWithAuthContext } from "firebase-functions/firestore";
import { DB_DEV, DB_PROD } from "../../../config/global";
import { getDatabase } from "../../../utils/global";
import { TDatabase } from "../../../types/global.type";
import { messaging } from "firebase-admin";





// GLOBAL
// ---------------------------------------------------------------------------------------
interface IParams { id_user:string; id_notification:string };
const PATH = "users/{id_user}/notifications/{id_notification}";
// ---------------------------------------------------------------------------------------





// ON CREATE USER NOTIFICATION
// ---------------------------------------------------------------------------------------
async function handle_create_user_notification(event: FirestoreAuthEvent<QueryDocumentSnapshot | undefined, IParams>) {

  const data = event.data?.data();
  const { id_user, id_notification } = event.params;
  
  if (!data || !data.is_push_notification) return;
  
  const DATABASE = event.database as TDatabase;
  const FIRESTORE = getDatabase(DATABASE);
  const tokensSnapshot = await FIRESTORE.collection(`users/${id_user}/fcm_tokens`).get();

  if (tokensSnapshot.empty) {
    console.info(`[FCM] No tokens found for user ${id_user}`);
    return;
  }

  const tokens = tokensSnapshot.docs.map(doc => doc.data().token as string);

  const message: messaging.MulticastMessage = {
    tokens,
    notification: {
      title: data.title ?? 'Nieuwe melding',
      body: data.description ?? '',
    },
    data: {
      link: data.link?.href ?? '/',
      id_notification,
    },
    webpush: {
      notification: {
        // TODO: vervang door absolute URL eens de app gedeployed is (bv. https://jouw-app.web.app/favicon/web-app-manifest-192x192.png)
        // icon: 'https://jouw-app.web.app/favicon/web-app-manifest-192x192.png',
        icon: 'https://firebasestorage.googleapis.com/v0/b/bird-larsen.firebasestorage.app/o/web-app-manifest-192x192.png?alt=media&token=a6d72e89-7fbf-4e88-a8ba-788fd0c3f456',
        badge: 'https://firebasestorage.googleapis.com/v0/b/bird-larsen.firebasestorage.app/o/web-app-manifest-192x192.png?alt=media&token=a6d72e89-7fbf-4e88-a8ba-788fd0c3f456',
      },
      fcmOptions: {
        link: data.link?.href ?? '/',
      },
    },
  };

  const response = await messaging().sendEachForMulticast(message);
  console.info(`[FCM] Sent: ${response.successCount} ok, ${response.failureCount} failed`);

  const invalidTokens: string[] = [];
  response.responses.forEach((resp, idx) => {
    if (!resp.success && (
      resp.error?.code === 'messaging/invalid-registration-token' ||
      resp.error?.code === 'messaging/registration-token-not-registered'
    )) {
      invalidTokens.push(tokens[idx]);
    }
  });

  if (invalidTokens.length > 0) {
    const batch = FIRESTORE.batch();
    for (const token of invalidTokens) {
      const ref = FIRESTORE.collection(`users/${id_user}/fcm_tokens`).doc(token);
      batch.delete(ref);
    }
    await batch.commit();
    console.info(`[FCM] Cleaned up ${invalidTokens.length} invalid tokens`);
  }

  await event.data?.ref.update({ is_push_sent: true });

}

export const onCreate_development = onDocumentCreatedWithAuthContext({ database: DB_DEV , document:PATH }, handle_create_user_notification );
export const onCreate = onDocumentCreatedWithAuthContext({ database: DB_PROD , document:PATH }, handle_create_user_notification );
// ---------------------------------------------------------------------------------------
