// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Button } from "@mui/material";
import UploadAvatar from "@/components/upload/components/avatar/upload-avatar";
import HelperText from "../../helper-text";
import { useTranslate } from "@/providers/language";
import { getUrl } from "@/utils/firebase";
import { TRHFUploadProps } from "../rhf-upload.type";


export default function RHFUploadAvatar({ name, square=false, slotProps, ...other }: TRHFUploadProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const { control, setValue, watch } = useFormContext();  
  const fieldValue = watch(name);

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [generatedUrl, setGeneratedUrl] = useState<string|null>(null);

  // When fieldValue is a string (gs:// path), show the fetched URL
  // When fieldValue is a File or null, use fieldValue directly
  const resolvedValue = typeof fieldValue === "string" ? generatedUrl : fieldValue;
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (typeof fieldValue !== "string") return;

    let cancelled = false;

    getUrl(fieldValue).then((url) => {
      if (!cancelled) {
        setGeneratedUrl(url);
      }
    });

    return () => { cancelled = true; };
  }, [fieldValue]);
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {

        const onDrop = (acceptedFiles: File[]): void => {
          const value = acceptedFiles[0];
          setValue(name, value, { shouldValidate: true, shouldDirty: true });
        };

        const onRemove = (): void => {
          setValue(name, null, { shouldValidate: true, shouldDirty: true });
        }

        return (
          <Box sx={{ alignItems: "center", display: "flex", flexDirection: "column", height: "fit-content" }} {...slotProps?.wrapper}>
            <UploadAvatar square={square} value={resolvedValue} error={!!error} onDrop={onDrop} {...other} />

            <HelperText errorMessage={error?.message} sx={{ textAlign: 'center' }} />

            {field.value && (<Button disabled={other.disabled} color='error' onClick={onRemove} sx={{ mt: 1 }}>{t('components.upload.avatar.delete')}</Button>)}
          </Box>
        );
      }}
    />

  )


}