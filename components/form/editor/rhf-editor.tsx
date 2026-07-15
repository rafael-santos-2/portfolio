// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFEditorProps } from "./rhf-editor.type";
import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@/components/editor";


export default function RHFEditor({ name, helperText, ...other }: TRHFEditorProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { control, formState: { isSubmitSuccessful } } = useFormContext();
  
  
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
        <Editor
          {...field}
          error={!!error}
          helperText={error?.message ?? helperText}
          resetValue={isSubmitSuccessful}
          {...other}
        />
      )}
    />

  )


}