import { FIRESTORE, STORAGE } from "@/config/firebase/client";
import { IPipelineQuery, IQuery, TFilterStructure, TPipelineFilter, TPipelineFilterStructure } from "@/types/database";
import { and, limit, or, orderBy, QueryCompositeFilterConstraint, QueryConstraint, QueryFieldFilterConstraint, Timestamp, where } from "firebase/firestore";
import { and as pAnd, arrayContains, arrayContainsAll, arrayContainsAny, constant, endsWith, equal, equalAny, field, greaterThan, greaterThanOrEqual, lessThan, lessThanOrEqual, notEqual, notEqualAny, or as pOr, Pipeline, regexContains, startsWith, stringContains, variable } from "firebase/firestore/pipelines";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";





// QUERY BUILDER
// ------------------------------------------------------------------------------
export function query_builder( options?:IQuery|null ):Array<QueryConstraint>{
  
  const result:Array<QueryConstraint> = [];
  
  if( !options ){ return result }
  
  // APPLY FILTERS
  if( options.filters && options.filters.length > 0 ){
    
    result.push(get_query_filters(options.filters) as QueryConstraint)
    
  }
  
  // APPLY SORT
  if( options.sort ){
    
    result.push( orderBy(options.sort.field , options.sort.direction) )
    
  }
  
  // APPLY LIMIT
  if( options.limit ){
    
    result.push( limit(options.limit) )
    
  }
  
  return result;
  
}



export function pipeline_builder(collection: string, options?: IPipelineQuery | null): Pipeline {

  let pipeline = FIRESTORE.pipeline().collection(collection);

  // DEFINES
  if (options?.defines?.length) {
    for (const d of options.defines) {
      pipeline = pipeline.define(field(d.field).as(d.as));
    }
  }

  // FILTERS — vóór addFields, gebruikt indexes op base collection velden
  if (options?.filters?.length) {
    const filterExpr = get_pipeline_filters(options.filters);
    if (filterExpr) pipeline = pipeline.where(filterExpr);
  }

  // ADD FIELDS — na filters, joins enkel op gefilterde documenten
  if (options?.addings?.length) {
    pipeline = options.addings.reduce((p, a) => p.addFields(a), pipeline);
  }

  // POST FILTERS — na addFields, op computed/joined velden
  if (options?.post_filters?.length) {
    const postFilterExpr = get_pipeline_filters(options.post_filters);
    if (postFilterExpr) pipeline = pipeline.where(postFilterExpr);
  }

  // SORT
  if (options?.sort) {
    pipeline = pipeline.sort(
      options.sort.direction === "desc"
        ? field(options.sort.field).descending()
        : field(options.sort.field).ascending()
    );
  }

  // OFFSET
  if (options?.offset) {
    pipeline = pipeline.offset(options.offset);
  }

  // LIMIT
  if (options?.limit) {
    pipeline = pipeline.limit(options.limit);
  }

  return pipeline;

}

function get_pipeline_filters(filters: TPipelineFilterStructure, level: number = 0): ReturnType<typeof equal> | null {

  const exprs = filters
    .map((filter) => {
      if (Array.isArray(filter)) return get_pipeline_filters(filter, level + 1);
      if (typeof filter.value === "string" && filter.value === "") return null;
      return get_pipeline_filter_expr(filter);
    })
    .filter((expr): expr is ReturnType<typeof equal> => expr !== null);

  if (exprs.length === 0) return null;
  if (exprs.length === 1) return exprs[0];
  return level % 2 === 0
    ? exprs.reduce((acc, expr) => pAnd(acc, expr))
    : exprs.reduce((acc, expr) => pOr(acc, expr));

}

function get_pipeline_filter_expr(filter: TPipelineFilter): ReturnType<typeof equal> {

  const f = field(filter.field);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v = filter.variable ? variable(filter.variable) : constant(filter.value as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arr = Array.isArray(filter.value) ? filter.value.map((item) => constant(item as any)) : [];
  switch (filter.op) {
    case "==":                  return equal(f, v);
    case "!=":                  return notEqual(f, v);
    case "<":                   return lessThan(f, v);
    case "<=":                  return lessThanOrEqual(f, v);
    case ">":                   return greaterThan(f, v);
    case ">=":                  return greaterThanOrEqual(f, v);
    case "contains":            return stringContains(f.toLower(), v);
    case "startsWith":          return startsWith(f.toLower(), v);
    case "endsWith":            return endsWith(f.toLower(), v);
    case "regex":               return regexContains(f, v);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    case "in":                  return equalAny(f, arr as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    case "not-in":              return notEqualAny(f, arr as any);
    case "array-contains":      return arrayContains(f, v);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    case "array-contains-any":  return arrayContainsAny(f, arr as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    case "array-contains-all":  return arrayContainsAll(f, arr as any);
    default:                    return equal(f, v);
  }
  
}

function get_query_filters( filters: TFilterStructure, level: number = 0 ): QueryCompositeFilterConstraint | QueryFieldFilterConstraint {

  const values: Array<QueryFieldFilterConstraint | QueryCompositeFilterConstraint> = [];

  for (const filter of filters) {
    // SUB ARRAY (AND OR OR)
    if (Array.isArray(filter)) {
      const complexQ = get_query_filters(filter, level + 1) as QueryCompositeFilterConstraint;
      values.push(complexQ);
    }
    // VALUE
    else {
      values.push(where(filter.field, filter.op, filter.value));
    }
  }

  // AND
  if (level % 2 === 0) {
    return and(...values);
  }
  // OR
  else {
    return or(...values);
  }
}
// ------------------------------------------------------------------------------





// DATA CONVERTOR
// ------------------------------------------------------------------------------
export function convertor<T extends object>(data:object): T {

  const result:Partial<T> = {} as T;

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key as keyof T] = value.toDate() as unknown as T[keyof T];
    } else {
      result[key as keyof T] = value as unknown as T[keyof T];
    }
  }

  return result as T;
}
// ------------------------------------------------------------------------------





// GET URL
// ------------------------------------------------------------------------------
export async function getUrl( path:string|null ):Promise<string|null> {

  try {

    if( path === null ){ throw "No path was given." }

    const REF = ref( STORAGE , path );
    const url = await getDownloadURL( REF );
    return url;

  } catch (error) {

    console.error("[URL] Cannot get download url of ref." , error);
    return null;
    
  }

}
// ------------------------------------------------------------------------------





// UPLOAD EDITOR IMAGE
// ------------------------------------------------------------------------------
export async function upload_editor_image(file: File): Promise<string> {
  const ext      = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(STORAGE, `editor-images/${filename}`);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
// ------------------------------------------------------------------------------