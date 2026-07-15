// PROCESS 
// ------------------------------------------------------------------------------
export interface IProcess {

  id: string;
  id_initiator: string;
  date_created: Date;
  title: string;
  description?: string;
  is_dismissed: boolean;
  
  number_actions_completed: number;
  number_actions_failed: number;
  status: TProcessStatus;
  type: TProcessType;
  status_message: string;
  
  progress?: number;
  id_auction?: string;
  paths_files?: Array<string>;

}
// ------------------------------------------------------------------------------


export type TProcessStatus = "Processing" | "Reviewing" | "Running" | "Completed" | "Failed" | "Canceled";
export type TProcessType = "Default";