'use client';

import { IUser } from '@/types/database';
// IMPORTS
// -----------------------------------------------------------------------------------------
import { createContext, useContext } from 'react';
// -----------------------------------------------------------------------------------------


// CONTEXT
// -----------------------------------------------------------------------------------------
export const ContextAuthentication = createContext<{

  is_authenticated:boolean;
  is_initialized:boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  user: IUser | null;

}
>({

  is_initialized : false,
  is_authenticated : false,

  login: async () => {},
  logout: async () => {},

  user: null,

});
// -----------------------------------------------------------------------------------------

export function useAuthContext(){
  const context = useContext(ContextAuthentication);
  return context;
}