// IMPORTS
// ---------------------------------------------------------------------------------------
import { STORAGE_DEV, STORAGE_PROD } from "../config/global";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { TDatabase } from "../types/global.type";


// GET DATABASE
// ---------------------------------------------------------------------------------------
export function getDatabase(DB: TDatabase) {
  return getFirestore(DB);
}


// GET STORAGE BUCKET
// ---------------------------------------------------------------------------------------
export function getStorageBucket(DB: TDatabase) {
  const bucketName = DB === "development" ? STORAGE_DEV : STORAGE_PROD;
  return getStorage().bucket(bucketName);
}


// CONVERTER
// ---------------------------------------------------------------------------------------
export function converter<T extends object>(data: object): T {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(data)) {
    result[key as keyof T] = value instanceof Timestamp ? value.toDate() : value;
  }

  return result as T;
}
