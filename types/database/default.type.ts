
// IMPORTS
// ------------------------------------------------------------------------------
import { FieldPath, OrderByDirection, WhereFilterOp } from "firebase/firestore";
// ------------------------------------------------------------------------------


export interface IFirestoreDefault {
  id: string,
  id_creator: string|null,
  id_updater: string|null,
  id_deleter: string|null,
  date_created: Date,
  date_updated: Date|null,
  date_deleted: Date|null,
  is_deleted: boolean,
}

export const FIRESTORE_DEFAULT: IFirestoreDefault = {
  id: "",
  id_creator: null,
  id_updater: null,
  id_deleter: null,
  date_created: new Date(),
  date_updated: null,
  date_deleted: null,
  is_deleted: false,
}



// QUERY STRUCTURE 
// ------------------------------------------------------------------------------
export type TFilter = { field:FieldPath|string; op:WhereFilterOp; value:unknown };
export type TFilterStructure = (TFilter | TFilterStructure)[];
export interface IQuery {
  filters?: TFilterStructure;
  sort?: { field:FieldPath|string; direction:OrderByDirection };
  limit?: number;
}
// ------------------------------------------------------------------------------


// PIPELINE BUILDER TYPES
// ------------------------------------------------------------------------------
import type { AliasedExpression } from "firebase/firestore/pipelines";

export type TPipelineFilterOp =
  | "==" | "!=" | "<" | "<=" | ">" | ">="
  | "contains" | "startsWith" | "endsWith" | "regex"
  | "in" | "not-in"
  | "array-contains" | "array-contains-any" | "array-contains-all";

export type TPipelineFilter = {
  field: string;
  op: TPipelineFilterOp;
  value?: string | number | boolean | unknown[];  // literal value (array for in/array-* ops)
  variable?: string;                              // reference to outer pipeline field (for sub-pipelines)
};
export type TPipelineFilterStructure = (TPipelineFilter | TPipelineFilterStructure)[];

export type TPipelineDefine = { field: string; as: string };

export interface IPipelineQuery {
  defines?:      TPipelineDefine[];
  filters?:      TPipelineFilterStructure;  // base collection velden — vóór addFields
  addings?:      AliasedExpression[];
  post_filters?: TPipelineFilterStructure;  // computed velden — ná addFields
  sort?:         { field: string; direction: "asc" | "desc" };
  limit?:        number;
  offset?:       number;
}
// ------------------------------------------------------------------------------
