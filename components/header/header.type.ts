import { ComponentPropsWithRef, JSX, ReactNode } from "react";




export const MAX_VISIBLE_ACTIONS_IN_HEADER:number = 2;



// ACTIONS
// ----------------------------------------------------------------------------------------------------
export interface IHeaderAction extends ComponentPropsWithRef<"button"> {

  label: string;
  fix?: boolean;
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  shape?: 'icon' | 'button';
  loading?: boolean;

  icon?: JSX.Element;
  iconPlacement?: 'left' | 'right';

};


// PROPS
// ----------------------------------------------------------------------------------------------------
export interface IHeader extends ComponentPropsWithRef<"div"> {

  title?: string;
  icon?: ReactNode;
  back?: string | boolean;
  actions?: IHeaderAction[];

}
