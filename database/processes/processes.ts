// IMPORTS 
// ------------------------------------------------------------------------------
import type { Unsubscribe } from "firebase/firestore";
import type { IProcess } from "@/types/database";
import type { IFirestoreDefault, IQuery } from "@/types/database";
import { FIRESTORE, AUTH } from "@/config/firebase/client";
import { doc, query, updateDoc, onSnapshot, collection, getDocs, getDoc } from "firebase/firestore";
import { convertor, query_builder } from "@/utils/firebase";





// CONFIG 
// ------------------------------------------------------------------------------
const COLLECTION_NAME = "processes";
// ------------------------------------------------------------------------------




// ------------------------------------------------------------------------------
// STREAM PROCESSES
// ------------------------------------------------------------------------------
export function stream_processes( callback:(processes:Array<IProcess>) => void , options:IQuery|null = null ):Unsubscribe {

  try {

    const COL = collection( FIRESTORE , `${COLLECTION_NAME}` );
    const QUERY = query( COL , ...query_builder(options) );
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => {
        
        callback( resp.docs.map( doc => convertor<IProcess>({...doc.data() , id: doc.id }) ) );
  
      },
      (err) => { throw err }
    );
  
    return SNAPSHOT;

    
  } catch (error) {
    
    console.error(`[STREAM] (processes) Cannot stream all processes from database.` , error)

    callback([]);
    return ()=>{}

  }

}



// ------------------------------------------------------------------------------
// STREAM PROCESS
// ------------------------------------------------------------------------------
export function stream_process( id:string , callback:(process:IProcess|null) => void ):Unsubscribe {

  try {

    const QUERY = doc( FIRESTORE , `${COLLECTION_NAME}/${id}` );
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => {
        
        if( resp.exists() ){ callback( convertor<IProcess>({ ...resp.data(), id: resp.id }) ) } 
        else { callback(null) }

      },
      (err) => {

        throw err

      }
    );

    return SNAPSHOT;
  
  } catch (error) {
    
    console.error(`[STREAM] (process) Cannot stream process from database.` , error)

    callback(null);
    return ()=>{}

  }



}



// -----------------------------------------------------------------------------------------
// GET PROCESSES
// -----------------------------------------------------------------------------------------
export async function get_processes( options:IQuery|null ):Promise<Array<IProcess>> {

  try {

    const REF = collection( FIRESTORE , COLLECTION_NAME );
    const QUERY = query( REF , ...query_builder(options) );
    return getDocs( QUERY ).then((resp) => resp.docs.map( doc => convertor<IProcess>({ ...doc.data() , id:doc.id }) ))
    
  } catch (error) {

    console.error(`[GET] (processes) Cannot get processes.` , error);
    return Promise.reject(error)

  }

}



// -----------------------------------------------------------------------------------------
// GET PROCESS
// -----------------------------------------------------------------------------------------
export async function get_process( id:string ):Promise<IProcess|null> {


  try {

    if( !id ){ throw "No process id was given." }

    const REF = doc( FIRESTORE , COLLECTION_NAME , id );
    return getDoc( REF ).then(resp => convertor<IProcess>({ ...resp.data() , id: resp.id }) );

  } catch (error) {
    
    console.error(`[GET] (process) Cannot get process from database.` , error)
    return null

  }


}



// -----------------------------------------------------------------------------------------
// UPDATE PROCESS
// -----------------------------------------------------------------------------------------
export async function update_process( id:string , data:Partial<Omit<IProcess , keyof IFirestoreDefault>> ):Promise<void>{

  try {

    // CHECKS
    if( !id ){ throw "No process id was given." }

    // USER
    const USER = AUTH.currentUser || null;
    if( !USER ){ throw "No current user is logged in." }

    // DATA
    const updateData:Partial<IProcess> = { 

      // Overrides
      ...data, 

      // Defaults


    };

    // UPDATE
    const REF = doc( FIRESTORE , `${COLLECTION_NAME}/${id}` );
    const TASK = await updateDoc( REF , updateData );
    return TASK;



  } catch (error) {
    
    console.error(`[UPDATE] (process) Cannot update process.` , error)
    return Promise.reject(error)

  }

}