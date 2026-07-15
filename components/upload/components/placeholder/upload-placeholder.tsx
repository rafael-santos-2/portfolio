// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TUploadPlaceholderProps } from "../../upload.type";
import { mergeClasses } from "minimal-shared/utils";
import { uploadPlaceholderClasses } from "../../classes";
import { styled } from "@mui/material";
import UploadIllustration from "./upload-illustration";
import { useTranslate } from "@/providers/language";


const PlaceholderRoot = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const PlaceholderContent = styled('div')(({ theme }) => ({
  display: 'flex',
  textAlign: 'center',
  gap: theme.spacing(1),
  flexDirection: 'column',
  [`& .${uploadPlaceholderClasses.title}`]: { ...theme.typography.h6 },
  [`& .${uploadPlaceholderClasses.description}`]: {
    ...theme.typography.body2,
    color: theme.vars.palette.text.secondary,
    '& span': {
      textDecoration: 'underline',
      margin: theme.spacing(0, 0.5),
      color: theme.vars.palette.primary.main,
    },
  },
}));


export default function UploadPlaceholder({ sx, className, ...other }: TUploadPlaceholderProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <PlaceholderRoot className={mergeClasses([uploadPlaceholderClasses.root, className])} sx={sx} {...other}>
      <UploadIllustration hideBackground sx={{ width: 200 }} />
      <PlaceholderContent>
        <div className={uploadPlaceholderClasses.title}>{t("components.upload.placeholder.title")}</div>
        <div className={uploadPlaceholderClasses.description}>
          {t("components.upload.placeholder.description")}
          <span>{t("components.upload.placeholder.browse")}</span>
          {t("components.upload.placeholder.descriptionSuffix")}
        </div>
      </PlaceholderContent>
    </PlaceholderRoot>

  )


}