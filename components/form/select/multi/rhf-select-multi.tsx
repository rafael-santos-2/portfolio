// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFMultiSelectProps } from "./rhf-select-multi.type";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Checkbox, Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import HelperText from "../../helper-text";


export default function RHFMultiSelect({ name, chip, label, options, checkbox, placeholder, slotProps, helperText, onChange, ...other }: TRHFMultiSelectProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { control } = useFormContext();
  const labelId = `${name}-multi-select`;

  
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
        <FormControl error={!!error} {...other}>

          {label && (
            <InputLabel htmlFor={labelId} {...slotProps?.inputLabel}>
              {label}
            </InputLabel>
          )}

          <Select
            {...field}
            multiple
            label={label}
            displayEmpty={!!placeholder}
            onChange={(event) => { field.onChange(event); onChange?.(event); }}

            renderValue={(selected) => {
              const selectedItems = options.filter((item) =>
                (selected as string[]).includes(item.value)
              );

              if (!selectedItems.length && placeholder) {
                return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
              }

              if (chip) {
                return (
                  <Box sx={{ gap: 0.5, display: 'flex', flexWrap: 'wrap' }}>
                    {selectedItems.map((item) => (
                      <Chip key={item.value} size="small" variant="soft" label={item.label} {...slotProps?.chip} />
                    ))}
                  </Box>
                );
              }

              return selectedItems.map((item) => item.label).join(', ');
            }}

            {...slotProps?.select}
            inputProps={{ id: labelId, ...slotProps?.select?.inputProps }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {checkbox && (
                  <Checkbox size="small" disableRipple checked={field.value.includes(option.value)} {...slotProps?.checkbox} />
                )}

                {option.label}
              </MenuItem>
            ))}
          </Select>

          <HelperText {...slotProps?.helperText} errorMessage={error?.message} helperText={helperText} />

        </FormControl>
      )}
    />

  )


}