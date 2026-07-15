import { TNavigationAction, TNavigationConfig, TNavigationItem } from "@/config/navigation";

export interface INavigationSubPopupProps {
  navigationConfig: TNavigationConfig;
  parentLabel: string;
  parentIcon: TNavigationItem["icon"];
  parentActions?: TNavigationAction[];
  open: boolean;
  onClose: () => void;
  onItemClick: () => void;
}
