// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { ITeamDetailsProps } from "./team-details.type";
import css from "./team-details.module.css";
import TeamDetailsGeneral from "./general/team-details-general";
import TeamDetailEmail from "./email/team-details-email";
import TeamDetailsPassword from "./password/team-details-password";


export default function TeamDetails({ user }:ITeamDetailsProps): JSX.Element {


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
        <TeamDetailsGeneral user={user} />
      </div>

      <div className={ css.column }>
        <TeamDetailEmail user={user} />
        <TeamDetailsPassword user={user} />
      </div>

    </div>

  )


}