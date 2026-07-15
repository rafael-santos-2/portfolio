// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { Tooltip, IconButton as MuiIconButton } from "@mui/material";
import { IIconButtonProps } from "./icon-button.type";
import Icon from "@/components/icon";
import { JSX } from "react";


export function IconButton({ tooltip, tooltipProps, loading, children, ...muiProps }:IIconButtonProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  const button = (
    <MuiIconButton disabled={loading} {...muiProps}>
      {loading ? <Icon name="spinner" /> : children}
    </MuiIconButton>
  );

  return tooltip ? (
    <Tooltip title={tooltip} {...tooltipProps}>
      {button}
    </Tooltip>
  ) : (
    button
  );


}