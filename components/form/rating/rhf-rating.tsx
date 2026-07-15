// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFRatingProps } from "./rhf-rating.type";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Rating } from "@mui/material";
import HelperText from "../helper-text";


export default function RHFRating({ name, helperText, slotProps, ...other }: TRHFRatingProps): JSX.Element {


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
        <Box
          {...slotProps?.wrapper}
          sx={[
            { display: 'flex', flexDirection: 'column' },
            ...(Array.isArray(slotProps?.wrapper?.sx)
              ? (slotProps?.wrapper?.sx ?? [])
              : [slotProps?.wrapper?.sx]),
          ]}
        >

          <Rating
            {...field}
            onChange={(event, newValue) => field.onChange(Number(newValue))}
            {...other}
          />

          <HelperText
            {...slotProps?.helperText}
            disableGutters
            errorMessage={error?.message}
            helperText={helperText}
          />

        </Box>
      )}
    />

  )


}