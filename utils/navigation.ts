import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";


export function updateSearchParams(
  searchParams: ReadonlyURLSearchParams,
  values: Record<string, unknown>,
  router: AppRouterInstance
): void {


  const params = new URLSearchParams(searchParams.toString());

  Object.entries(values).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") { params.delete(key);
    } 
    if (value instanceof Date && !isNaN(value.getTime())) {
      params.set(key , value.toDateString());
    } else if (typeof value === "boolean") {
      params.set(key , value ? "true" : "false");
    } else {
      params.set(key , String(value));
    }
  });

  router.replace(`?${params.toString()}`, { scroll: false });


}