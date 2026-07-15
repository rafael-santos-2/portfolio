import { TNavigationItem } from "@/config/navigation";

export interface INavigationMoreProps {
  items: TNavigationItem[];
  open: boolean;
  onClose: () => void;
  onSelectItem: (item: TNavigationItem) => void;
  selectedItem: TNavigationItem | null;
  subNavItem: TNavigationItem | null;
  onSubNavOpen: (item: TNavigationItem) => void;
  onSubNavClose: () => void;
  onSubItemClick: () => void;
  showBackButton?: boolean;
  onLogout?: () => void;
}
