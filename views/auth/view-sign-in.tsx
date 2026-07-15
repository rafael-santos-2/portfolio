"use client";

import { PATH_AFTER_AUTH } from "@/config/paths";
import Form_login from "@/widgets/forms/login/form-login";
import { JSX } from "react";
import css from './view-sign-in.module.css'
import { Logo } from "@/components";


export default function ViewSignIn(): JSX.Element {


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

    <div className={ css.container }>

      <Logo className={ css.logo } />

      <Form_login redirect_path={PATH_AFTER_AUTH} />

    </div>
  )


}