// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TSingleFilePreviewProps } from "../../upload.type";
import { styled } from "@mui/material";
import { mergeClasses } from "minimal-shared/utils";
import { uploadClasses } from "../../classes";

const PreviewRoot = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  padding: theme.spacing(1),
  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
}));


export default function UploadPreviewSingleFile({ file, sx, className, ...other }: TSingleFilePreviewProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const fileName = typeof file === 'string' ? file : file.name;
  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <PreviewRoot className={mergeClasses([uploadClasses.uploadSinglePreview, className])} sx={sx} {...other}>
      {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview URL of a selected file; next/image can't optimize blob srcs */}
      <img alt={fileName} src={previewUrl} />
    </PreviewRoot>

  )


}