import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';
import { APP } from './client';
import { CONFIG } from '../app';

let messaging: Messaging | null = null;

// Messaging is enkel beschikbaar in de browser
export function get_firebase_messaging(): Messaging|null {
  if (typeof window === 'undefined') return null;

  if (!messaging) {
    messaging = getMessaging(APP)
  }

  return messaging;
}

// Vraag FCM token op (na toestemming)
export async function get_fcm_token(): Promise<string|null> {
  try {
    const m = get_firebase_messaging();
    if (!m) return null;

    const token = await getToken(m, { vapidKey: CONFIG.vapidKey });

    return token ?? null;
  } catch (error) {
    console.error('[FCM] Failed to get token:', error);
    return null
  }
}

// Luister naar berichten terwijl de app open is (foreground)
export { onMessage, get_firebase_messaging as messaging };