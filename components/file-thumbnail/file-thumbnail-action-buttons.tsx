// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { ButtonBase, ButtonBaseProps, CSSObject, IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import Icon from "@/components/icon";


// DOWNLOAD BUTTON
// ----------------------------------------------------------------------------------------------------
export function FileThumbnailDownloadButton({ sx, ...other }: ButtonBaseProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <ButtonBase
      sx={[
        (theme): CSSObject => ({
          p: 0,
          top: 0,
          right: 0,
          width: 1,
          height: 1,
          zIndex: 9,
          opacity: 0,
          position: 'absolute',
          color: 'common.white',
          borderRadius: 'inherit',
          transition: theme.transitions.create(['opacity']),
          '&:hover': {
            opacity: 1,
            backgroundColor: varAlpha(theme.vars.palette.grey[900], 0.64),
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Icon name="download" size={24} />
    </ButtonBase>

  )


}


// REMOVE BUTTON
// ----------------------------------------------------------------------------------------------------
export function FileThumbnailRemoveButton({ sx, ...other }: IconButtonProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <IconButton
      size="small"
      sx={[
        (theme): CSSObject => ({
          p: 0.35,
          top: 4,
          right: 4,
          position: 'absolute',
          color: 'common.white',
          bgcolor: varAlpha(theme.vars.palette.grey[900], 0.48),
          '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey[900], 0.72) },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Icon name="close" size={12} />
    </IconButton>

  )


}
