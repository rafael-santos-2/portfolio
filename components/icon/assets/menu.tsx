// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { IIconAsset } from "../icons.types";


export default function IconMenu({ color="inherit", size=20 }: IIconAsset) {


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

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} color={color} fill="none">
      <path d="M4 8.5L20 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15.5L20 15.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )


}

