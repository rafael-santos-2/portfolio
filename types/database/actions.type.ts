export interface IProcessAction {

  id: string,
  date_created: Date,
  date_executed?: Date,
  status: TProcessActionStatus,

  variables:  {[key:string]:unknown};
  commands: Array<ICommand>;
  data?:  {[key:string]:unknown};

}



export interface ICommand {
  
  type: TCommandType;
  path?: string;
  filters?: Array<TCommandFilter>;
  conditions?: Array<TCommandCondition>;
  data?: {[key:string]:unknown};
  commands?: Array<ICommand>;
  alias?: string;
  variable?: string;

}


export type TProcessActionStatus = "Pending" | "Running" | "Failed" | "Completed" | "Retry";
export type TCommandType = "GET" | "UPDATE" | "DELETE" | "CREATE" | "ASSIGN";
export type TCommandFilter = { field:string , op:TCommandFilterOperator , value:unknown }
export type TCommandFilterOperator = "==" | "<" | ">" | "<=" | ">=" | "!="
export type TCommandCondition = { field:string , op:TCommandFilterOperator , value:unknown , commands:Array<ICommand> }
