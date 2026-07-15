export interface IConfigValue {

  appName: string;
  version: string;
  isStaticExport: boolean;
  debugMode: boolean;

  firebase: {

    appId: string;
    apiKey: string;
    projectId: string;
    authDomain: string;
    storageBucket: string;
    measurementId: string;
    messagingSenderId: string;

  };

  firestore: string;
  storage: string;
  region: "europe-west1";

  server: {

    privateKey: string;
    clientEmail: string;
    projectId: string;

  },

  vapidKey: string;

};

export type TChangeCategory = "added" | "improved" | "fixed" | "removed" | "deprecated" | "security" | "performance" | "breaking";

export type TChange = {
  category: TChangeCategory;
  description: string;
};

export type TPatchNote = {
  version: string;
  date: string;
  title?: string;
  changes: TChange[];
};
