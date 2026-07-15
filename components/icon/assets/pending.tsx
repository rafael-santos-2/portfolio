// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { IIconAsset } from "../icons.types";


export default function IconPending({ color="inherit", size=20 }: IIconAsset) {


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
    <path d="M6 16H10L6 20H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4H11L4 12H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 9H20L14 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )


}