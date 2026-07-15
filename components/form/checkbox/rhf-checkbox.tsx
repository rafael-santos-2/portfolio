// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFCheckboxProps } from "./rhf-checkbox.type";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import HelperText from "../helper-text";


export default function RHFCheckbox({ sx, name, label, slotProps, helperText, ...other }: TRHFCheckboxProps): JSX.Element {


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
        <Box {...slotProps?.wrapper}>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                {...field}
                checked={field.value}
                {...slotProps?.checkbox}
                sx={[{ mx: 0 }, ...(Array.isArray(sx) ? (sx ?? []) : [sx])]}
                slotProps={{
                  ...slotProps?.checkbox?.slotProps,
                  input: {
                    id: `${name}-checkbox`,
                    ...(!label && { 'aria-label': `${name} checkbox` }),
                    ...slotProps?.checkbox?.slotProps?.input,
                  },
                }}
              />
            }
            {...other}
          />
          <HelperText {...slotProps?.helperText} errorMessage={error?.message} helperText={helperText} />
        </Box>
      )}
    />

  )


}