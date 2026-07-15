'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { AUTH } from "@/config/firebase/client";
import { IUser } from "@/types";
import { stream_user } from "@/database/users/users";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, Unsubscribe } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { ContextAuthentication } from "./context-authentication";


export function ProviderAuthentication({ children }:{ children:ReactNode }) {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [ is_initialized , set_is_initialized] = useState<boolean>( false );
  const [ is_authenticated , set_is_authenticated ] = useState<boolean>( false );

  const [ user , set_user ] = useState<IUser|null>( null );

  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function login( email:string , password:string ) {
    try {

      const response = await signInWithEmailAndPassword( AUTH , email , password );
      if(!response){ throw response };

      console.info(`[AUTHENTICATION] (login) Login succesfull for: ${response.user.email}.`);

      return;
      
    } catch (error) {
      
      console.error(`[AUTHENTICATION] (login) Could not login.` , error);
      return Promise.reject(error)

    }
  };

  async function logout() { await signOut( AUTH ); };
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect( () => {

    console.info("[AUTHENTICATION] Authentication check.");

    let unsubscribeUser: Unsubscribe | null = null;

    const unsubscribeAuth = onAuthStateChanged( AUTH , (u) => {

      // Cleanup previous user stream
      if (unsubscribeUser) {
        unsubscribeUser();
        unsubscribeUser = null;
      }

      if( u ){

        console.info("[AUTHENTICATION] User logged in." , u.email);

        unsubscribeUser = stream_user(u.uid, (data) => {
          set_user(data);
        });

        set_is_authenticated(true);

      } else {

        console.info(`[AUTHENTICATION] User is logged out.`);
        set_user(null);
        set_is_authenticated(false);

      }

      set_is_initialized(true);

    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) {
        unsubscribeUser();
      }
    };

  } , [] );
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <ContextAuthentication.Provider
      value={{

        is_authenticated,
        is_initialized,

        login,
        logout,

        user,

      }}
    >
      {children}
    </ContextAuthentication.Provider>
  );
}