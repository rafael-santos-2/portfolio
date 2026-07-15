import { TNavigationAction, TNavigationConfig, TNavigationItem } from "@/config/navigation";

export interface INavigationItemProps {
  label: string;
  icon: TNavigationItem["icon"];
  path?: string;
  onClick?: () => void;
  caption?: string;
  isLogout?: boolean;
  mini?: boolean;
  exact?: boolean;
  subNavigation?: TNavigationConfig;
  actions?: TNavigationAction[];
  hideLabelOnMini?: boolean;
  active?: boolean;
  suffix?: React.ReactNode;
}