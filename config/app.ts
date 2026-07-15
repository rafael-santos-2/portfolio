import { IConfigValue } from "@/types/app.type";

export const CONFIG:IConfigValue = {

  appName: 'Bird Larsen Template',
  version: process.env.NEXT_PUBLIC_VERSION ?? '0.0.1',
  isStaticExport: process.env.BUILD_STATIC_EXPORT ? JSON.parse(process.env.BUILD_STATIC_EXPORT) : false,
  debugMode: process.env.NEXT_PUBLIC_DEBUGMODE === "true",

  firebase: {

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID ?? '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',

  },

  firestore: process.env.NEXT_PUBLIC_FIRESTORE ?? '',
  storage: process.env.NEXT_PUBLIC_FIRESTORAGE ?? '',
  region: "europe-west1",

  server: {

    privateKey: process.env.FIREBASE_PRIVATE_KEY ?? "",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",

  },

  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?? "",
  
};

export const BREAKPOINT:number = 768;