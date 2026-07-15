'use client';

// IMPORTS
// -----------------------------------------------------------------------------------------
import type { ReactNode } from 'react';
import { useEffect , useState } from 'react';
import { Context_background } from './context-processes';
import { AUTH, FIRESTORE } from '@/config/firebase/client';
import { stream_processes, update_process } from '@/database';
import { Button, IconButton, Tooltip } from '@mui/material';
import { collection, getCountFromServer } from 'firebase/firestore';
import { Icon } from '@/components';
import { IProcess } from '@/types';

import css from "./provider-processes.module.css";
// -----------------------------------------------------------------------------------------



// PROVIDER
// -----------------------------------------------------------------------------------------
export function Provider_background({ children }:{ children:ReactNode }) {



  // REFERENCES
  // -----------------------------------------------------------------------------------------
  const ID_USER = AUTH.currentUser?.uid || null;


  // STATES
  // -----------------------------------------------------------------------------------------
  const [ processes , set_processes ] = useState<Array<IProcess>>([]);
  const [ showOthers , set_showOthers ] = useState<boolean>(false);



  // FUNCTIONS
  // -----------------------------------------------------------------------------------------
  function handlePopover(){

    if( showOthers ){ set_showOthers(false) }
    if( !showOthers ){ set_showOthers(true) }

  }


  // EFFECTS
  // -----------------------------------------------------------------------------------------
  useEffect( () => {

    console.info("[BACKGROUND] Streaming background processes for user");
    let STREAM = () => {};
    if( ID_USER ){
      STREAM = stream_processes((resp) => set_processes(resp) , {filters:[{field:"id_initiator" , op:"==" , value:ID_USER},{field:"is_dismissed" , op:"==" , value:false}] , sort:{field:'date_created', direction:"desc"}})
    }

    return () => { STREAM(); }

  } , [ID_USER] );


  // WRAPPER
  // -----------------------------------------------------------------------------------------
  return (
    <Context_background.Provider value={{}} >
      <div className={[css.container , (processes.length > 0 ? css.hasprocesses : "")].join(" ")} >

        {/* PROCESSES */}
        { processes.length > 0 && 
          <div className={css.processes} >

            {/* FIRST */}
            <div className={css.header} >

              <Process process={processes[0]}/>

              { processes.length > 1 && 
                <>
                  <p>|</p>
                  <Button onClick={handlePopover} size='small' style={{whiteSpace:'nowrap' , marginRight:16 , marginLeft:8}} startIcon={<Icon name="chevron-down" />} >{processes.length - 1}</Button>
                </>
              }

            </div>

            {/* OTHERS */}
            <div className={[css.others , (showOthers ? css.open : css.close) ].join(" ")} >
              {processes.slice(1).map((p) => <Process key={p.id} process={p}/>)}
            </div>


          </div>
        }

        <div className={css.content} >
          {children}
        </div>

      </div>
    </Context_background.Provider>
  );
}
// -----------------------------------------------------------------------------------------





// -----------------------------------------------------------------------------------------
function Process({process}:{process:IProcess}){


  // STATES
  // -----------------------------------------------------------------------------------------
  const [ number_of_actions , set_number_of_actions ] = useState(0);
  // -----------------------------------------------------------------------------------------



  // FUNCTIONS
  // -----------------------------------------------------------------------------------------
  function get_progress(){

    if( process.progress !== undefined ){ return `${process.progress }%`}
    return `${process.number_actions_completed + process.number_actions_failed} | ${number_of_actions}`;

  }

  async function handleDismissed(){
    await update_process(process.id , {is_dismissed:true})
  }

  async function handleCancel(){
    await update_process(process.id , {status:"Failed" , is_dismissed:true})
  }
  // -----------------------------------------------------------------------------------------



  // EFFECTS
  // -----------------------------------------------------------------------------------------
  useEffect(() => {

    getCountFromServer( collection(FIRESTORE , `processes/${process.id}/actions`) ).then((resp) => set_number_of_actions(resp.data().count) )

  },[process])
  // -----------------------------------------------------------------------------------------



  // -----------------------------------------------------------------------------------------
  return(
    <div className={[ css.process , css[process.status] ].join(" ")} >

      {/* ICON */}
      <div className={css.icon} >
        { process.status === "Processing" && <Icon name="processing" /> }
        { process.status === "Reviewing" && <Icon name="review" /> }
        { process.status === "Running" && <Icon name="running" /> }
        { process.status === "Completed" && <Icon name="check" /> }
        { process.status === "Failed" && <Icon name="error" /> }
        
      </div>
      {/* STATUS */}
      <p className={css.status} >{process.status}</p>

      {/* TITLE */}
      <p className={css.title} >{process.title}</p>

      {/* DESCRIPTION */}
      <p className={css.description} >{` | ${process.status_message}`}</p>

      {/* PROGRESS */}
      { process.status != "Reviewing" && process.status != 'Processing' && 
        <p className={css.progress} >{get_progress()}</p>
      }

      {/* FAILED NUMBER */}
      { process.status != "Reviewing" && process.status != 'Processing' && process.number_actions_failed > 0 &&
        <div style={{ color:"var(--error-main)" , display:"flex" , gap:8, alignItems:'center' }} >
          <Icon name="warning" />
          <p className={css.progress} >{process.number_actions_failed}</p>
        </div>
      }

      {/* CANCEL */}
      { (process.status === "Processing" || process.status === "Running" || process.status === "Reviewing") &&
        <Button onClick={handleCancel} color='error' size='small' sx={{paddingX:1}} >Cancel process</Button>
      }

      {/* DISMISS */}
      { (process.status === "Completed" || process.status === "Failed" ) &&
        <Tooltip title="Process verbergen" >
          <IconButton onClick={handleDismissed} color="inherit" size='small' ><Icon name="close" /></IconButton>
        </Tooltip>
      }

    </div>
  )
  // -----------------------------------------------------------------------------------------

}
// -----------------------------------------------------------------------------------------