// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TUploadProps } from "../../upload.type";
import { useDropzone } from "react-dropzone";
import { Box, CSSObject } from "@mui/material";
import { mergeClasses, varAlpha } from "minimal-shared/utils";
import { uploadClasses } from "../../classes";
import Icon from "@/components/icon";


export default function UploadBox({ placeholder, error, disabled, className, sx, ...other }: TUploadProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ disabled, ...other });

  const hasError = isDragReject || error;
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Box
      {...getRootProps()}
      className={mergeClasses([uploadClasses.uploadBox, className])}
      sx={[
        (theme): CSSObject => ({
          width: 64,
          height: 64,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1,
          cursor: 'pointer',
          alignItems: 'center',
          color: 'text.disabled',
          justifyContent: 'center',
          bgcolor: varAlpha(theme.vars.palette.grey[500], 0.08),
          border: `dashed 1px ${varAlpha(theme.vars.palette.grey[500], 0.16)}`,
          ...(isDragActive && { opacity: 0.72 }),
          ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
          }),
          '&:hover': { opacity: 0.72 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >

      <input {...getInputProps()} />

      {placeholder || <Icon name="upload" size={28} />}

    </Box>

  )


}