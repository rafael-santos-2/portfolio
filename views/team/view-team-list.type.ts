import { IUser } from "@/types";
import { TUseFiltersDefaults } from "@/hooks/use-filters";


export interface ITableFilters extends TUseFiltersDefaults {
  search?: string;
  role?: string;
}
export interface ITableUser extends IUser {

  invoice_reference: string;

} 