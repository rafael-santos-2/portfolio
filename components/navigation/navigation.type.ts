import { TNavigationConfig } from "@/config/navigation";

export interface INavigationProps {
  headerType: "logo" | "group";
  navigationConfig: TNavigationConfig;
  disableFooter?: boolean;
  sub?: boolean;
}