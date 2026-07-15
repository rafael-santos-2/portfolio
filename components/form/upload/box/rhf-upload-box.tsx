// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFUploadProps } from "../rhf-upload.type";
import { Controller, useFormContext } from "react-hook-form";
import UploadBox from "@/components/upload/components/box/upload-box";


export default function RHFUploadBox({ name, ...other }: TRHFUploadProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { control } = useFormContext();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox value={field.value} error={!!error} {...other} />
      )}
    />

  )


}