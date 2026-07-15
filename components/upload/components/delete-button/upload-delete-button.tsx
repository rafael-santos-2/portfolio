// IMPORTS
// ----------------------------------------------------------------------------------------------------

import Icon from "@/components/icon";
import { CSSObject, IconButton, IconButtonProps } from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { JSX } from "react";


export default function UploadDeleteButton({ sx, ...other }: IconButtonProps): JSX.Element {


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
  return (

    <IconButton
      size="small"
      sx={[
        (theme): CSSObject => ({
          top: 16,
          right: 16,
          zIndex: 9,
          position: 'absolute',
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.8),
          bgcolor: varAlpha(theme.vars.palette.grey[900], 0.72),
          '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey[900], 0.48) },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Icon name="close" size={18} />
    </IconButton>

  )


}