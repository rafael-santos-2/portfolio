// IMPORTS
// ----------------------------------------------------------------------------------------------------

import css from "./logo.module.css";
import { ILogoProps } from "./logo.type";


export default function Logo({ small = false, style, className }: ILogoProps) {

  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div className={ [css.container, className].join(" ") } style={style}>

      {/* eslint-disable-next-line @next/next/no-img-element -- fixed-dimension SVG brand asset; next/image offers no benefit for inline SVG logos */}
      <img
        alt="Logo"
        src={small ? "/logo/logo-bird-larsen-small-black.svg" : "/logo/logo-bird-larsen-black.svg"}
        width="100%"
        height="100%"
      />

    </div>

  );
}