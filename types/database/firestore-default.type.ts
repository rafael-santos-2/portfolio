export interface IFirestoreDefault {
  id: string;
  id_creator: string | null;
  id_updater: string | null;
  id_deleter: string | null;
  date_created: Date;
  date_updated: Date | null;
  date_deleted: Date | null;
  is_deleted: boolean;
}

export const FIRESTORE_DEFAULT: IFirestoreDefault = {
  id: "",
  id_creator: null,
  id_updater: null,
  id_deleter: null,
  date_created: new Date(),
  date_updated: null,
  date_deleted: null,
  is_deleted: false,
};
