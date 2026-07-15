// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFMultiSwitchProps } from "./rhf-switch-multi.type";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch } from "@mui/material";
import HelperText from "../../helper-text";


export default function RHFMultiSwitch({ name, label, options, helperText, slotProps, ...other }: TRHFMultiSwitchProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string): string[] =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];
      
  
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
        <FormControl component="fieldset" {...slotProps?.wrapper}>

          {label && (
            <FormLabel
              component="legend"
              {...slotProps?.formLabel}
              sx={[
                { mb: 1, typography: 'body2' },
                ...(Array.isArray(slotProps?.formLabel?.sx)
                  ? (slotProps?.formLabel?.sx ?? [])
                  : [slotProps?.formLabel?.sx]),
              ]}
            >
              {label}
            </FormLabel>
          )}

          <FormGroup {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Switch
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value, option.value))}
                    {...slotProps?.switch}
                    slotProps={{
                      ...slotProps?.switch?.slotProps,
                      input: {
                        id: `${option.value}-switch`,
                        ...(!option.label && { 'aria-label': `${option.value} switch` }),
                        ...slotProps?.switch?.slotProps?.input,
                      }
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>

          <HelperText {...slotProps?.helperText} disableGutters errorMessage={error?.message} helperText={helperText} />

        </FormControl>
      )}
    />

  )


}