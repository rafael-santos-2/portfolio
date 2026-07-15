export type TLogAction = 'create' | 'update' | 'delete' | 'process' | 'crash' | 'other';
export type TLogSeverity = 'info' | 'success' | 'warning' | 'error' | 'debug';
export type TLogSource = 'client' | 'server' | 'cloud';




export interface ILog {

  id: string;
  date_created: Date;

  // Source of the log entry
  source: TLogSource;

  // Status
  severity: TLogSeverity;

  // Action
  action: TLogAction;

  environment: string;
  app_version?: string;

  // Resource the action was performed on
  resource_type?: string;
  resource_id?: string | null;
  resource_label?: string | null;
  resource_path?: string | null;

  // Message (supports i18n)
  name: string;
  name_key?: string;
  name_params?: Record<string, string | number>;
  description: string;
  description_key?: string;
  description_params?: Record<string, string | number>;

  // Actor
  id_user: string | null;
  label_user: string | "system" | null;

  // Extra context
  metadata?: {
    agent?: string;
    platform?: string;
    viewport?: string;
    url?: string;
    [key:string]: unknown;
  };


  // Grouping
  tags?: string[];
  id_session?: string | null;

  
}

export const LOG_DEFAULT: ILog = {

  id: "",
  id_user: null,
  label_user: "",
  date_created: new Date(), 
  environment: "development",

  name: "",
  description: "",
  
  severity: 'debug',
  source: 'client',
  action: 'other',

  metadata: {},
  tags: [],

}