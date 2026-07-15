// IMPORTS
// ------------------------------------------------------------------------------
import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { IMaintenance } from "@/types/database";
import { FIRESTORE } from "@/config/firebase/client";
import { convertor } from "@/utils/firebase";
// ------------------------------------------------------------------------------


// CONFIG
// ------------------------------------------------------------------------------
const COLLECTION_NAME = "maintenance";
// ------------------------------------------------------------------------------


// STREAM ACTIVE MAINTENANCE
// ------------------------------------------------------------------------------
export function stream_maintenance( callback: (maintenance: IMaintenance[]) => void ): Unsubscribe {
  try {

    const COL = collection(FIRESTORE, COLLECTION_NAME);
    const QUERY = query(COL, where("is_active", "==", true), where("is_deleted", "==", false));
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => { callback(resp.docs.map(doc => convertor<IMaintenance>({ ...doc.data(), id: doc.id }))); },
      (err) => { throw err; }
    );
    return SNAPSHOT;

  } catch (error) {

    console.error(`[STREAM] (maintenance) Cannot stream maintenance from database.`, error);
    callback([]);
    return () => {};

  }
}
// ------------------------------------------------------------------------------
