// TYPES
// ----------------------------------------------------------------------------------------------------

import { ReactNode } from "react";


export interface ICardFileProps {
  path: string;
  previewPath?: string;
  onDelete?: (path: string) => void;
  actions?: TCardFileAction[];
  highlighted?: boolean;
  onSelect?: (path: string) => void;
  selected?: boolean;
}

export type TCardFileAction = {
  label: string;
  icon: ReactNode;
  color?: string;
  onClick: () => void;
  isDisabled?: boolean;
};
