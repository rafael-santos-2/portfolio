// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TUploadProps } from "./upload.type";
import { useDropzone } from "react-dropzone";
import { Box, Button, CSSObject, FormHelperText } from "@mui/material";
import { uploadClasses } from "./classes";
import { mergeClasses, varAlpha } from "minimal-shared/utils";
import UploadPreviewSingleFile from "./components/preview-single-file/upload-preview-single-file";
import UploadPlaceholder from "./components/placeholder/upload-placeholder";
import UploadDeleteButton from "./components/delete-button/upload-delete-button";
import UploadRejectionFiles from "./components/rejection-files/upload-rejection-files";
import Icon from "../icon";
import UploadPreviewMultiFiles from "./components/preview-multi-files/upload-preview-multi-files";


export default function Upload({ sx, value, error, disabled, onDelete, onUpload, onRemove, thumbnail, helperText, onRemoveAll, className, multiple = false, ...other }: TUploadProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({ multiple, disabled, ...other });

  const isArray = Array.isArray(value) && multiple;
  const hasFile = !isArray && !!value;
  const hasFiles = isArray && !!value.length;
  const hasError = isDragReject || !!error;

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Box className={mergeClasses([uploadClasses.upload, className])} sx={[{ width: 1, position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}>

      <Box
        {...getRootProps()}
        sx={[
          (theme): CSSObject => ({
            p: 5,
            outline: 'none',
            borderRadius: 1,
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: varAlpha(theme.vars.palette.grey[500], 0.08),
            border: `1px dashed ${varAlpha(theme.vars.palette.grey[500], 0.2)}`,
            transition: theme.transitions.create(['opacity', 'padding']),
            '&:hover': { opacity: 0.72 },
            ...(isDragActive && { opacity: 0.72 }),
            ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
            ...(hasError && {
              color: 'error.main',
              borderColor: 'error.main',
              bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
            }),
            ...(hasFile && { padding: '28% 0' }),
          }),
        ]}
      >

        <input {...getInputProps()} />

        {hasFile ? <UploadPreviewSingleFile file={value as File} /> : <UploadPlaceholder />}

      </Box>

      {hasFile && <UploadDeleteButton onClick={onDelete} />}

      {helperText && (
        <FormHelperText error={!!error} sx={{ mx: 1.75 }}>
          {helperText}
        </FormHelperText>
      )}

      {!!fileRejections.length && <UploadRejectionFiles files={fileRejections} />}

      {hasFiles && (
        <>

          <UploadPreviewMultiFiles files={value} thumbnail={thumbnail} onRemove={onRemove} sx={{ my: 3 }} />

          {(onRemoveAll || onUpload) && (
            <Box sx={{ gap: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
              {onRemoveAll && (
                <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
                  Remove all
                </Button>
              )}

              {onUpload && (
                <Button size="small" variant="contained" onClick={onUpload} startIcon={<Icon name="upload" />}>
                  Upload
                </Button>
              )}
            </Box>
          )}
        </>
      )}

    </Box>

  )


}