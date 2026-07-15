import { TNavigationAction, TNavigationItem } from "@/config/navigation";

export interface INavigationGroupProps {
  title?: string;
  actions?: TNavigationAction[];
  items: TNavigationItem[];
  mini?: boolean;
  isSub?: boolean;
}