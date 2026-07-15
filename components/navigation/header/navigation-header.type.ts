import { TNavigationAction, TNavigationItem } from "@/config/navigation";

export interface INavigationHeaderProps {
  title?: string;
  icon?: TNavigationItem["icon"];
  actions?: TNavigationAction[];
  extra?: React.ReactNode;
}