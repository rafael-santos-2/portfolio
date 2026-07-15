// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { create_log } from '@/database/logs/logs';
import { AUTH } from '@/config/firebase/client';
import type { ILog, TLogSeverity } from '@/types/database';
import { CONFIG } from '@/config/app';
// ----------------------------------------------------------------------------------------------------


type TParamTranslate = string | {
  default: string;
  key?: string;
  values?: Record<string,string>
}
type TLogExtra = Pick<ILog , "action" | "app_version" | "metadata" | "resource_id" | "resource_label" | "resource_path" | "resource_type" | "tags" | "id_session">




// HELPERS
// ----------------------------------------------------------------------------------------------------
function get_severity_level(severity:TLogSeverity){

  switch (severity) {
    case "debug": return 0;
    case "info": return 1;
    case "warning": return 2;
    case "error": return 3;
    case "success": return 1;
    
    default: return 3;

  }

}
function get_browser_context():Pick<ILog, 'metadata' > {

  try {

    const nav = typeof navigator !== 'undefined' ? navigator : null;
    const win = typeof window !== 'undefined' ? window : null;
  
    return {
      metadata: {
        agent:             nav?.userAgent ?? '',
        platform:          nav?.platform ?? '',
        viewport:          win ? `${win.innerWidth}x${win.innerHeight}` : '',
        url:               win?.location.href ?? '',
      }
    };
    
  } catch {
    return {};
  }

}

async function write(input:Pick<ILog , "source" | "severity" | "name" | "description" | "name_key" | "name_params" | "description_key" | "description_params" > & TLogExtra): Promise<void> {
  try {

    if( !Boolean(process.env.NEXT_PUBLIC_DEBUGMODE) ){ return };
    if( Number(process.env.NEXT_PUBLIC_DEBUG_SEVERITY) > get_severity_level(input.severity) ){ return }

    const current_user = AUTH.currentUser;
    const actor_id = current_user?.uid ?? null;
    const actor_label = current_user?.displayName ?? current_user?.email ?? null;
    const browser = get_browser_context();

    await create_log({

      ...input,
      app_version: CONFIG.version,
      metadata: { ...input.metadata , ...browser.metadata },
      environment: process.env.NODE_ENV ?? 'development',
      id_user: actor_id,
      severity: input.severity ?? 'debug',
      label_user: actor_label,

    });

  } catch (error) {
    console.error('[LOGGER] Cannot write log.', error);
  }
}
// ----------------------------------------------------------------------------------------------------


function get_param(param:TParamTranslate):{  default: string; key?: string; values?: Record<string,string>}{

  if(typeof param === "string"){ return { default:param } }
  else { return param }

}



// LOGGER
// ----------------------------------------------------------------------------------------------------
export const logger = {

  debug( name:TParamTranslate , description:TParamTranslate , extra?:TLogExtra ) {

    console.debug(`[${get_param(name).default}] ${get_param(description).default}` , extra)
    return write({ 
      source:"client" , 
      severity:"debug" , 

      name:get_param(name).default , 
      name_key:get_param(name).key , 
      name_params:get_param(name).values , 
      
      description:get_param(description).default , 
      description_key:get_param(description).key , 
      description_params:get_param(description).values , 

      action:extra?.action || "other" 
      , ...extra 
    });

  },

  info( name:TParamTranslate , description:TParamTranslate , extra?:TLogExtra ) {

    console.info(`[${get_param(name).default}] ${get_param(description).default}` , extra)
    return write({
      source:"client" ,
      severity:"info" ,

      name:get_param(name).default ,
      name_key:get_param(name).key ,
      name_params:get_param(name).values ,

      description:get_param(description).default ,
      description_key:get_param(description).key ,
      description_params:get_param(description).values ,

      action:extra?.action || "other"
      , ...extra
    });

  },

  success( name:TParamTranslate , description:TParamTranslate , extra?:TLogExtra ) {

    console.log(`[${get_param(name).default}] ${get_param(description).default}` , extra)
    return write({
      source:"client" ,
      severity:"success" ,

      name:get_param(name).default ,
      name_key:get_param(name).key ,
      name_params:get_param(name).values ,

      description:get_param(description).default ,
      description_key:get_param(description).key ,
      description_params:get_param(description).values ,

      action:extra?.action || "other"
      , ...extra
    });

  },

  warning( name:TParamTranslate , description:TParamTranslate , extra?:TLogExtra ) {

    console.warn(`[${get_param(name).default}] ${get_param(description).default}` , extra)
    return write({
      source:"client" ,
      severity:"warning" ,

      name:get_param(name).default ,
      name_key:get_param(name).key ,
      name_params:get_param(name).values ,

      description:get_param(description).default ,
      description_key:get_param(description).key ,
      description_params:get_param(description).values ,

      action:extra?.action || "other"
      , ...extra
    });

  },

  error( name:TParamTranslate , description:TParamTranslate , extra?:TLogExtra ) {

    console.error(`[${get_param(name).default}] ${get_param(description).default}` , extra)
    return write({
      source:"client" ,
      severity:"error" ,

      name:get_param(name).default ,
      name_key:get_param(name).key ,
      name_params:get_param(name).values ,

      description:get_param(description).default ,
      description_key:get_param(description).key ,
      description_params:get_param(description).values ,

      action:extra?.action || "crash"
      , ...extra
    });

  },

};
// ----------------------------------------------------------------------------------------------------
