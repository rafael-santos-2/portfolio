// IMPORTS
// ------------------------------------------------------------------------------
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, Unsubscribe, where, QueryDocumentSnapshot, DocumentData, doc, setDoc } from "firebase/firestore";
import { ILog, IQuery } from "@/types/database";
import { FIRESTORE } from "@/config/firebase/client";
import { convertor, query_builder } from "@/utils/firebase";
// ------------------------------------------------------------------------------


// CONFIG
// ------------------------------------------------------------------------------
const COLLECTION_LOGS = "logs";
const LOGS_PAGE_SIZE = 25;

function logs_ref() {
  return collection(FIRESTORE, COLLECTION_LOGS);
}
// ------------------------------------------------------------------------------


// STREAM LOGS
// ------------------------------------------------------------------------------
export function stream_logs(callback: (logs: ILog[]) => void, options: IQuery | null = null): Unsubscribe {
  try {

    const COL = logs_ref();
    const QUERY = query(
      COL,
      where("is_deleted", "==", false),
      orderBy("date_created", "desc"),
      limit(LOGS_PAGE_SIZE),
      ...query_builder(options),
    );
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => { callback(resp.docs.map(doc => convertor<ILog>({ ...doc.data(), id: doc.id }))); },
      (err) => { throw err; }
    );
    return SNAPSHOT;

  } catch (error) {

    console.error(`[STREAM] (logs) Cannot stream logs from database.`, error);
    callback([]);
    return () => {};

  }
}
// ------------------------------------------------------------------------------


// GET LOGS (PAGINATED)
// ------------------------------------------------------------------------------
export async function get_logs(options: IQuery | null = null, cursor: QueryDocumentSnapshot<DocumentData> | null = null): Promise<{ logs: ILog[]; cursor: QueryDocumentSnapshot<DocumentData> | null }> {
  try {

    const COL = logs_ref();
    const constraints = [
      where("is_deleted", "==", false),
      orderBy("date_created", "desc"),
      ...query_builder(options),
      limit(LOGS_PAGE_SIZE),
    ];

    if (cursor) {
      constraints.push(startAfter(cursor));
    }

    const QUERY = query(COL, ...constraints);
    const SNAPSHOT = await getDocs(QUERY);

    const logs = SNAPSHOT.docs.map(doc => convertor<ILog>({ ...doc.data(), id: doc.id }));
    const next_cursor = SNAPSHOT.docs.length === LOGS_PAGE_SIZE ? SNAPSHOT.docs[SNAPSHOT.docs.length - 1] : null;

    return { logs, cursor: next_cursor };

  } catch (error) {

    console.error(`[GET] (logs) Cannot get logs from database.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// GET ERROR LOGS
// ------------------------------------------------------------------------------
export async function get_error_logs(max: number = 100): Promise<ILog[]> {
  try {

    const COL = logs_ref();
    const QUERY = query(
      COL,
      where("severity", "==", "error"),
      orderBy("date_created", "desc"),
      limit(max),
    );
    const SNAPSHOT = await getDocs(QUERY);
    return SNAPSHOT.docs.map(doc => convertor<ILog>({ ...doc.data(), id: doc.id }));

  } catch (error) {

    console.error(`[GET] (logs) Cannot get error logs from database.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------


// CREATE LOG
// ------------------------------------------------------------------------------
export async function create_log(data: Omit<ILog, 'id' | 'date_created'>): Promise<void> {
  try {

    const COL = logs_ref();
    const REF = doc(COL);

    const payload:Partial<ILog> = Object.fromEntries(
      Object.entries({ ...data, id: REF.id, date_created: new Date() })
        .filter(([, v]) => v !== undefined)
    );

    await setDoc(REF, payload);

  } catch (error) {

    console.error(`[CREATE] (log) Cannot create log.`, error);
    throw error;

  }
}
// ------------------------------------------------------------------------------
