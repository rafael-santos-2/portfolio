// IMPORTS
// ------------------------------------------------------------------------------
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, Unsubscribe, updateDoc } from "firebase/firestore";
import { AUTH, FIRESTORE } from "@/config/firebase/client";
import { IFirestoreDefault, IMember, IQuery } from "@/types/database";
import { convertor, query_builder } from "@/utils/firebase";
// ------------------------------------------------------------------------------


// CONFIG
// ------------------------------------------------------------------------------
const COLLECTION_NAME = "members";
// ------------------------------------------------------------------------------


// STREAM MEMBERS
// ------------------------------------------------------------------------------
export function stream_members(callback: (members: IMember[]) => void, options: IQuery | null = null): Unsubscribe {
  try {

    const COL = collection(FIRESTORE, COLLECTION_NAME);
    const QUERY = query(COL, ...query_builder(options));
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => { callback(resp.docs.map((doc) => convertor<IMember>({ ...doc.data(), id: doc.id }))); },
      (err) => { throw err; }
    );
    return SNAPSHOT;

  } catch (error) {

    console.error(`[STREAM] (members) Cannot stream all members from database.`, error);
    callback([]);
    return () => {};

  }
}
// ------------------------------------------------------------------------------


// STREAM MEMBER
// ------------------------------------------------------------------------------
export function stream_member(id: string, callback: (member: IMember | null) => void): Unsubscribe {
  try {

    const QUERY = doc(FIRESTORE, `${COLLECTION_NAME}/${id}`);
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => {
        if (resp.exists()) {
          callback(convertor<IMember>({ ...resp.data(), id: resp.id }));
        } else {
          callback(null);
        }
      },
      (err) => { throw err; }
    );
    return SNAPSHOT;

  } catch (error) {

    console.error(`[STREAM] (member) Cannot stream member from database.`, error);
    callback(null);
    return () => {};

  }
}
// ------------------------------------------------------------------------------


// GET MEMBERS
// ------------------------------------------------------------------------------
export async function get_members(options?: IQuery | null): Promise<IMember[]> {
  try {

    const REF = collection(FIRESTORE, COLLECTION_NAME);
    const QUERY = query(REF, ...query_builder(options));
    return getDocs(QUERY).then((resp) => resp.docs.map((doc) => convertor<IMember>({ ...doc.data(), id: doc.id })));

  } catch (error) {

    console.error(`[GET] (members) Cannot get members.`, error);
    return Promise.reject(error);

  }
}
// ------------------------------------------------------------------------------


// GET MEMBER
// ------------------------------------------------------------------------------
export async function get_member(id: string): Promise<IMember | null> {
  try {

    if (!id) { throw "No member id was given."; }

    const REF = doc(FIRESTORE, COLLECTION_NAME, id);
    return getDoc(REF).then((resp) => {
      if (!resp.exists()) { return null; }
      return convertor<IMember>({ ...resp.data(), id: resp.id });
    });

  } catch (error) {

    console.error(`[GET] (member) Cannot get member from database.`, error);
    return null;

  }
}
// ------------------------------------------------------------------------------


// CREATE MEMBER
// ------------------------------------------------------------------------------
export async function create_member(data: Pick<IMember, "firstName" | "lastName" | "email" | "role" | "is_active">): Promise<void> {
  try {

    const COL = collection(FIRESTORE, COLLECTION_NAME);

    await addDoc(COL, {
      ...data,
      id_creator: AUTH.currentUser?.uid ?? null,
      id_updater: null,
      id_deleter: null,
      date_created: serverTimestamp(),
      date_updated: null,
      date_deleted: null,
      is_deleted: false,
    });

  } catch (error) {

    console.error(`[CREATE] (member) Cannot create member.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// UPDATE MEMBER
// ------------------------------------------------------------------------------
export async function update_member(id: string, data: Partial<Omit<IMember, keyof IFirestoreDefault>>): Promise<void> {
  try {

    if (!id) { throw "No member id was given."; }

    const USER = AUTH.currentUser || null;
    if (!USER) { throw "No current user is logged in."; }

    const REF = doc(FIRESTORE, `${COLLECTION_NAME}/${id}`);
    await updateDoc(REF, {
      ...data,
      id_updater: USER.uid,
      date_updated: serverTimestamp(),
    });

  } catch (error) {

    console.error(`[UPDATE] (member) Cannot update member.`, error);
    return Promise.reject(error);

  }
}
// ------------------------------------------------------------------------------
