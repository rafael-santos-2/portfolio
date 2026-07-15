// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useState } from "react";
import { ILoader } from "./loader.type";
import css from "./loader.module.css";


export default function Loader({ disableTimeout = true , variant }:ILoader): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [ show, setShow ] = useState<boolean>(disableTimeout ? true : false);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {

    if (disableTimeout) return;

    const timeout = setTimeout(() => { setShow(true); }, 1000);

    return () => clearTimeout(timeout);

  }, [ disableTimeout ]);
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  if (!show) {
    return <></>
  }

  if( variant === "circle" ){

    return(
      <svg className={ css.spinner } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"currentColor"} fill={"none"}>
        <path d="M12 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21 12L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.3635 5.63672L16.2422 7.75804" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.75804 16.2422L5.63672 18.3635" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.3635 18.3635L16.2422 16.2422" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.75804 7.75804L5.63672 5.63672" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )

  }

  return (

    <div className={[ css.container ].join(" ")}>

      <div className={ css.dot } />
      <div className={ css.dot } style={{ animationDelay: '200ms' }} />
      <div className={ css.dot } style={{ animationDelay: '400ms' }} />

    </div>

  )


}