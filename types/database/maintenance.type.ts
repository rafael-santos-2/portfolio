import type { IFirestoreDefault } from "./default.type";
import { FIRESTORE_DEFAULT } from "./default.type";

export interface IMaintenance extends IFirestoreDefault {
  title: string;
  message: string;
  scheduled_start: Date;
  scheduled_end: Date;
  is_active: boolean;
}

export const MAINTENANCE_DEFAULT: IMaintenance = {
  title: "",
  message: "",
  scheduled_start: new Date(),
  scheduled_end: new Date(),
  is_active: false,
  ...FIRESTORE_DEFAULT,
}
