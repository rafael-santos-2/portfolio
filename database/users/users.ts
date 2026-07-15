// IMPORTS 
// ------------------------------------------------------------------------------
import { collection, doc, getDoc, onSnapshot, query, Unsubscribe } from "firebase/firestore";
import { concat, countAll, execute } from "firebase/firestore/pipelines";
import { IPipelineQuery, IQuery, IUser } from "../../types/database";
import { AUTH, FIRESTORE } from "@/config/firebase/client";
import { convertor, pipeline_builder, query_builder } from "@/utils/firebase";
import { convert_to_base64 } from "@/utils/converters";
import { PATHS_API } from "@/config/paths";
// ------------------------------------------------------------------------------





// CONFIG 
// ------------------------------------------------------------------------------
const COLLECTION_NAME = "users";
// ------------------------------------------------------------------------------





// STREAM USERS
// ------------------------------------------------------------------------------
export function stream_users( callback:(users:Array<IUser>) => void , options:IQuery|null = null ):Unsubscribe {
  try {

    
    
    const COL = collection( FIRESTORE , `${COLLECTION_NAME}` );
    const QUERY = query( COL , ...query_builder(options));
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => { callback( resp.docs.map( doc => convertor<IUser>({...doc.data() , id: doc.id }) ) ); },
      (err) => { throw err }
    );
    return SNAPSHOT;
    
  } catch (error) {
    
    console.error(`[STREAM] (users) Cannot stream all users from database.` , error)
    callback([]);
    return ()=>{}
    
  }
}
// ------------------------------------------------------------------------------



// STREAM USER
// ------------------------------------------------------------------------------
export function stream_user( id:string , callback:(user:IUser|null) => void ):Unsubscribe {
  try {
    
    const QUERY = doc( FIRESTORE , `${COLLECTION_NAME}/${id}` );
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => {
        if( resp.exists() ){ callback( convertor<IUser>({ ...resp.data(), id: resp.id }) ) } 
        else { callback(null) }
      },
      (err) => { throw err }
    );
    return SNAPSHOT;
    
  } catch (error) {
    
    console.error(`[STREAM] (user) Cannot stream user from database.` , error)
    callback(null);
    return ()=>{}
    
  }
}
// ------------------------------------------------------------------------------



// GET USERS — ADDINGS
// -----------------------------------------------------------------------------------------
const USER_ADDINGS = {
  fullname: concat("firstName", " ", "lastName").as("fullname"),
  invoice_reference: pipeline_builder("invoices", {
    filters: [{ field: "id", op: "==", variable: "id_invoice" }],
  }).select("reference").toScalarExpression().toLower().as("invoice_reference"),
} as const;

export type TUserAdding = keyof typeof USER_ADDINGS;
// -----------------------------------------------------------------------------------------


// GET USERS
// -----------------------------------------------------------------------------------------
export async function get_users<T extends IUser>( options?:Pick<IPipelineQuery , "filters" | "sort" | "limit" | "offset"> & { count?:boolean; addings?:TUserAdding[] } ):Promise<{data:Array<T>,total:number}> {
  try {

    const addings = (options?.addings ?? []).map((key) => USER_ADDINGS[key]);

    const QUERY = pipeline_builder("users", {
      defines: [{ field: "id_invoice", as: "id_invoice" }],
      addings,
      filters: options?.filters,
      sort: options?.sort,
    });

    let dataQuery = QUERY.offset(options?.offset || 0);
    if (options?.limit) dataQuery = dataQuery.limit(options.limit);

    const [RESP, RESP_COUNT] = await Promise.all([
      execute(dataQuery),
      options?.count ? execute(QUERY.aggregate(countAll().as("total"))) : Promise.resolve(null),
    ]);

    return {
      data: RESP.results.map((result) => convertor<T>(result.data())),
      total: RESP_COUNT?.results.at(0)?.data()?.total ?? 0,
    };

  } catch (error) {

    console.error(`[GET] (users) Cannot get users.` , error);
    return Promise.reject(error)

  }
}
// -----------------------------------------------------------------------------------------



// GET USER
// -----------------------------------------------------------------------------------------
export async function get_user( id:string ):Promise<IUser|null> {
  try {
    
    if( !id ){ throw "No user id was given." }
    const REF = doc( FIRESTORE , COLLECTION_NAME , id );
    return getDoc( REF ).then(resp => convertor<IUser>({ ...resp.data() , id: resp.id }) );
    
  } catch (error) {
    
    console.error(`[GET] (user) Cannot get user from database.` , error)
    return null
    
  }
}
// -----------------------------------------------------------------------------------------



// CREATE USER (API)
// -----------------------------------------------------------------------------------------
export async function create_user( data: Partial<IUser> & { password: string }, image?: File ): Promise<IUser> {
  try {

    let imagePayload: { base64: string; name: string; type: string } | undefined;
    if ( image instanceof File ) {
      const base64 = await convert_to_base64(image);
      imagePayload = { base64, name: image.name, type: image.type };
    }

    const token = await AUTH.currentUser?.getIdToken();
    if ( !token ) { throw "Not authenticated." }

    const resp = await fetch(PATHS_API.USER.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        ...(imagePayload ? { image: imagePayload } : {}),
      }),
    });

    if ( !resp.ok ) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData?.error || resp.statusText);
    }

    const body = await resp.json();

    return convertor<IUser>(body?.data);

  } catch (error) {

    console.error(`[CREATE] (user) Cannot create user.`, error);
    return Promise.reject(error);

  }
}
// -----------------------------------------------------------------------------------------



// PASSWORD USER (API)
// -----------------------------------------------------------------------------------------
export async function password_user( id: string, password: string ): Promise<Response> {
  try {

    if ( !id ) { throw "No user id was given." }
    if ( !password ) { throw "No password was given." }

    const token = await AUTH.currentUser?.getIdToken();
    if ( !token ) { throw "Not authenticated." }

    const resp = await fetch(PATHS_API.USER.PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ id, password }),
    });

    if ( !resp.ok ) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData?.error || resp.statusText);
    }

    return resp;

  } catch (error) {

    console.error(`[PASSWORD] (user) Cannot update user password.`, error);
    return Promise.reject(error);

  }
}
// -----------------------------------------------------------------------------------------



// DELETE USER (API)
// -----------------------------------------------------------------------------------------
export async function delete_user( id: string ): Promise<Response> {
  try {

    if ( !id ) { throw "No user id was given." }

    const token = await AUTH.currentUser?.getIdToken();
    if ( !token ) { throw "Not authenticated." }

    const resp = await fetch(PATHS_API.USER.DELETE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if ( !resp.ok ) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData?.error || resp.statusText);
    }

    return resp;

  } catch (error) {

    console.error(`[DELETE] (user) Cannot delete user.`, error);
    return Promise.reject(error);

  }
}
// -----------------------------------------------------------------------------------------



// DISABLE USER (API)
// -----------------------------------------------------------------------------------------
export async function disable_user( id: string, disable: boolean ): Promise<Response> {
  try {

    if ( !id ) { throw "No user id was given." }

    const token = await AUTH.currentUser?.getIdToken();
    if ( !token ) { throw "Not authenticated." }

    const resp = await fetch(PATHS_API.USER.DISABLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ id, disable }),
    });

    if ( !resp.ok ) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData?.error || resp.statusText);
    }

    return resp;

  } catch (error) {

    console.error(`[DISABLE] (user) Cannot update user disabled state.`, error);
    return Promise.reject(error);

  }
}
// -----------------------------------------------------------------------------------------



// UPDATE USER (API)
// -----------------------------------------------------------------------------------------
export async function update_user( id: string, data: Partial<IUser>, image?: string | File | null ):Promise<IUser> {
  try {

    if ( !id ) { throw "No user id was given." }

    // IMAGE — convert to base64 for server transport
    let imagePayload: { base64: string; name: string; type: string } | undefined;
    if ( image instanceof File ) {
      const base64 = await convert_to_base64(image);
      imagePayload = { base64, name: image.name, type: image.type };
    }

    // AUTH TOKEN
    const token = await AUTH.currentUser?.getIdToken();
    if ( !token ) { throw "Not authenticated." }

    // REQUEST
    const resp = await fetch(PATHS_API.USER.UPDATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        ...data,
        ...(imagePayload ? { image: imagePayload } : {}),
      }),
    });

    // HANDLE RESPONSE
    if ( !resp.ok ) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData?.error || resp.statusText);
    }

    const body = await resp.json();

    return convertor<IUser>(body?.data);

  } catch (error) {

    console.error(`[UPDATE] (user) Cannot update user.`, error);
    return Promise.reject(error);

  }
}
// -----------------------------------------------------------------------------------------