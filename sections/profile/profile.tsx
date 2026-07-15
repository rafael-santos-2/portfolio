// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import css from "./profile.module.css";
import { IProfileProps } from "./profile.type";
import ProfileGeneral from "./general/profile-general";
import ProfileEmail from "./email/profile-email";
import ProfilePassword from "./password/profile-password";


export default function Profile({ user }:IProfileProps): JSX.Element {


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

    <div className={ css.content }>

      <div className={ css.column }>
        <ProfileGeneral user={user} />
      </div>

      <div className={ css.column }>
        <ProfileEmail user={user} />
        <ProfilePassword />
      </div>

    </div>

  )


}