// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFAutocompleteProps } from "./rhf-autocomplete.type";
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { useTranslate } from "@/providers/language";


export default function RHFAutocomplete({ name, label, slotProps, helperText, placeholder, ...other }: TRHFAutocompleteProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const { control, setValue } = useFormContext();
  const { textfield, ...otherSlotProps } = slotProps ?? {};

  
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
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          noOptionsText={t("components.autocomplete.noOptions")}
          loadingText={t("components.autocomplete.loading")}
          renderInput={(params) => (
            <TextField
              {...params}
              {...textfield}
              label={label}
              error={!!error}
              placeholder={placeholder}
              helperText={error?.message ?? helperText}
              slotProps={{
                ...textfield?.slotProps,
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: 'new-password',
                  ...textfield?.slotProps?.htmlInput,
                },
              }}
            />
          )}
          {...other}
          {...otherSlotProps}
        />
      )}
    />

  )


}