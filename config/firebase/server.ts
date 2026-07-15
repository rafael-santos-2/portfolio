// IMPORTS 
// ------------------------------------------------------------------------------
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore"
import { cert , getApp , getApps , initializeApp } from "firebase-admin/app";
import { CONFIG } from "@/config/app";


// INIT 
// ------------------------------------------------------------------------------
if (!getApps().length) {

  initializeApp({
    credential: cert({
      clientEmail: CONFIG.server.clientEmail,
      privateKey: CONFIG.server.privateKey?.replace(/\\n/g, '\n'),
      projectId: CONFIG.server.projectId,
    }),
  }, "server");

}

// ------------------------------------------------------------------------------

export const APP = getApp("server");
export const AUTH = getAuth(APP);
export const FIRESTORE = getFirestore(APP, CONFIG.firestore);
export const STORAGE = getStorage(APP).bucket(CONFIG.storage);