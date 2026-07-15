// IMPORTS 
// ------------------------------------------------------------------------------
import { collection, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { FIRESTORE } from '@/config/firebase/client';
// ------------------------------------------------------------------------------





// CONFIG 
// ------------------------------------------------------------------------------
const COLLECTION_USERS = 'users';
const COLLECTION_FCM_TOKENS = 'fcm_tokens';

function fcm_tokens_ref(id_user: string) {
  return collection(FIRESTORE, `${COLLECTION_USERS}/${id_user}/${COLLECTION_FCM_TOKENS}`);
}
// ------------------------------------------------------------------------------





// CREATE FCM TOKEN
// -----------------------------------------------------------------------------------------
export async function save_fcm_token(id_user: string, token: string): Promise<void> {
  try {
    // Token zelf gebruiken als document ID (is uniek per device/browser)
    const REF = doc(fcm_tokens_ref(id_user), token);
    await setDoc(REF, {
      token,
      last_used: serverTimestamp(),
      date_created: serverTimestamp(),
      is_deleted: false,
    }, { merge: true }); // merge: true → update als het al bestaat
  } catch (error) {
    console.error('[FCM] Cannot save token:', error);
    throw error;
  }
}
// -----------------------------------------------------------------------------------------





// DELETE FCM TOKEN
// -----------------------------------------------------------------------------------------
export async function delete_fcm_token(id_user: string, token: string): Promise<void> {
  try {
    const REF = doc(fcm_tokens_ref(id_user), token);
    await deleteDoc(REF);
  } catch (error) {
    console.error('[FCM] Cannot delete token:', error);
  }
}
// -----------------------------------------------------------------------------------------