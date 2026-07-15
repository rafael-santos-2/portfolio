// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFSwitchProps } from "./rhf-switch.type";
import { Controller, useFormContext } from "react-hook-form";
import { Box, FormControlLabel, Switch } from "@mui/material";
import HelperText from "../helper-text";


export default function RHFSwitch({ name, helperText, label, slotProps, sx, ...other }: TRHFSwitchProps): JSX.Element {


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
              <Switch
                {...field}
                checked={field.value}
                {...slotProps?.switch}
                slotProps={{
                  ...slotProps?.switch?.slotProps,
                  input: {
                    id: `${name}-switch`,
                    ...(!label && { 'aria-label': `${name} switch` }),
                    ...slotProps?.switch?.slotProps?.input,
                  }
                }}
              />
            }
            sx={[{ mx: 0 }, ...(Array.isArray(sx) ? (sx ?? []) : [sx])]}
            {...other}
          />

          <HelperText {...slotProps?.helperText} errorMessage={error?.message} helperText={helperText} />

        </Box>
      )}
    />

  )


}