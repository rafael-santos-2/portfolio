// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useMemo } from "react";
import { TUploadProps } from "../../upload.type";
import { Box, CSSObject, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { mergeClasses, varAlpha } from "minimal-shared/utils";
import { uploadClasses } from "../../classes";
import { Image } from "@/components/image";
import { useTranslate } from "@/providers/language";
import Icon from "@/components/icon";
import UploadRejectionFiles from "../rejection-files/upload-rejection-files";


export default function UploadAvatar({ sx, error, value, disabled, helperText, className, square = false,...other }: TUploadProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    disabled,
    accept: { 'image/*': [] },
    ...other,
  });

  const hasFile = !!value;
  const hasError = isDragReject || !!error;
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const preview = useMemo(() => {
    if (typeof value === 'string') return value;
    if (value instanceof File) return URL.createObjectURL(value);
    return '';
  }, [value]);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <>

      <Box
        {...getRootProps()}
        className={mergeClasses([uploadClasses.uploadAvatar, className])}
        sx={[
          (theme): CSSObject => ({
            p: 1,
            m: 'auto',
            width: 144,
            height: 144,
            cursor: 'pointer',
            overflow: 'hidden',
            borderRadius: square ? "8px" : '50%',
            border: `1px dashed ${varAlpha(theme.vars.palette.grey[500], 0.2)}`,
            ...(isDragActive && { opacity: 0.72 }),
            ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
            ...(hasError && { borderColor: 'error.main' }),
            ...(hasFile && {
              ...(hasError && { bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08) }),
              '&:hover .upload-placeholder': { opacity: 1 },
            }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >

        <input {...getInputProps()} />

        <Box sx={{ width: 1, height: 1, overflow: 'hidden', borderRadius: square ? "8px" : '50%', position: 'relative', }} >

          {hasFile && ( <Image alt="Avatar" src={preview} sx={{ width: 1, height: 1, borderRadius: square ? "8px" : '50%' }} /> )}

          <Box
            className="upload-placeholder"
            sx={(theme) => ({
              top: 0,
              gap: 1,
              left: 0,
              width: 1,
              height: 1,
              zIndex: 9,
              display: 'flex',
              borderRadius: square ? "8px" : '50%',
              position: 'absolute',
              alignItems: 'center',
              color: 'text.disabled',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: varAlpha(theme.vars.palette.grey[500], 0.08),
              transition: theme.transitions.create(['opacity'], {
                duration: theme.transitions.duration.shorter,
              }),
              '&:hover': { opacity: 0.72 },
              ...(hasError && {
                color: 'error.main',
                bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
              }),
              ...(hasFile && {
                zIndex: 9,
                opacity: 0,
                color: 'common.white',
                bgcolor: varAlpha(theme.vars.palette.grey[900], 0.64),
              }),
            })}
          >
            <Icon name="camera" size={32} />

            <Typography variant="caption">{hasFile ? t("components.upload.avatar.update") : t("components.upload.avatar.upload")}</Typography>
          </Box>

        </Box>

      </Box>

      {helperText && helperText}

      {!!fileRejections.length && <UploadRejectionFiles files={fileRejections} />}

    </>

  )


}