import { ComponentPropsWithRef, CSSProperties, JSX } from 'react';
import { PopoverOrigin, PopoverPosition } from "@mui/material";



export const DEFAULT_STACK_OFFSET:number = 80;
export const DEFAULT_ANIMATION:TPopupAnimation = "slide";
export const MAX_VISIBLE_ACTIONS_IN_HEADER:number = 2;


export type TPopupAnimation = 'slide' | 'pop';
export type TPopupVariant = 'fullscreen' | 'default' | "popover";
export type TPopupPositionX = "left" | "center" | "right";
export type TPopupPositionY = "top" | "center" | "bottom";
export interface IPopupOverlay {
  variant?: "default" | "transparent";
  style?: CSSProperties;
}


export interface IPopup extends ComponentPropsWithRef<"div"> {

  open: boolean;
  onClose: (value?: unknown) => void;
  variant?: TPopupVariant;
  position?: { horizontal:TPopupPositionX|{ desktop?:TPopupPositionX , mobile?:TPopupPositionX } , vertical:TPopupPositionY|{ desktop?:TPopupPositionY , mobile?:TPopupPositionY } };
  overlay?: IPopupOverlay;
  style?: CSSProperties;
  
  // POPOVER PROPS
  target?: Element;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  anchorPosition?: PopoverPosition;

  // PROVIDER
  level?: number;
  offset?: number;

  // Animation
  animation?: TPopupAnimation;

  /** Called after the close animation completes and the popup is fully gone. */
  onClosed?: () => void;

}



export interface IPopupHeader {

  variant?: "default" | "border";
  title?: string;
  subtitle?: string;
  actions?: TPopupAction[];
  closeable?: boolean;

}

export interface IPopupActions {

  actions: TPopupAction[];

}




export interface TPopupAction extends ComponentPropsWithRef<"button"> {

  label: string;
  fix?: boolean;
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  shape?: 'icon' | 'button';
  loading?: boolean;

  icon?: JSX.Element;
  iconPlacement?: 'left' | 'right';

};
