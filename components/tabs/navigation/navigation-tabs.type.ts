import { ReactNode } from "react";

export type TTab = {
  path: string;
  title: string;
  icon?: ReactNode;
  label?: ReactNode;
  color?: string;
};

export interface INavigationTabsProps {
  tabs: TTab[];
  replace?: boolean;
}
