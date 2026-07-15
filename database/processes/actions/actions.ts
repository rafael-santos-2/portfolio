// IMPORTS 
// ------------------------------------------------------------------------------
import type { Unsubscribe } from "firebase/firestore";
import type { IFirestoreDefault, IQuery , IProcessAction } from "@/types";
import { FIRESTORE, AUTH } from "@/config/firebase/client";
import { doc, query, updateDoc, onSnapshot, collection } from "firebase/firestore";
import { convertor, query_builder } from "@/utils/firebase";





// CONFIG 
// ------------------------------------------------------------------------------
const COLLECTION_NAME = (id_process:string) => `processes/${id_process}/actions`;
// ------------------------------------------------------------------------------




// ------------------------------------------------------------------------------
// STREAM ACTIONS
// ------------------------------------------------------------------------------
export function stream_process_actions( id_process:string , callback:(actions:Array<IProcessAction>) => void , options:IQuery|null = null ):Unsubscribe {

  try {

    const COL = collection( FIRESTORE , `${COLLECTION_NAME(id_process)}` );
    const QUERY = query( COL , ...query_builder(options) );
    const SNAPSHOT = onSnapshot(
      QUERY,
      (resp) => {
        
        callback( resp.docs.map( doc => convertor<IProcessAction>({...doc.data() , id: doc.id }) ) );
  
      },
      (err) => { throw err }
    );
  
    return SNAPSHOT;

    
  } catch (error) {
    
    console.error(`[STREAM] (processes actions) Cannot stream all process actions from database.` , error)

    callback([]);
    return ()=>{}

  }

}




// -----------------------------------------------------------------------------------------
// UPDATE ACTION
// -----------------------------------------------------------------------------------------
export async function update_process_action( id_process:string , id:string , data:Partial<Omit<IProcessAction , keyof IFirestoreDefault>> ):Promise<void>{

  try {

    // CHECKS
    if( !id ){ throw "No process id was given." }

    // USER
    const USER = AUTH.currentUser || null;
    if( !USER ){ throw "No current user is logged in." }

    // DATA
    const updateData:Partial<IProcessAction> = { 

      // Overrides
      ...data, 

    };

    // UPDATE
    const REF = doc( FIRESTORE , `${COLLECTION_NAME(id_process)}/${id}` );
    const TASK = await updateDoc( REF , updateData );
    return TASK;



  } catch (error) {
    
    console.error(`[UPDATE] (process action) Cannot update process action.` , error)
    return Promise.reject(error)

  }

}