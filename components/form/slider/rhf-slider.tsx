// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFSliderProps } from "./rhf-slider.type";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Slider } from "@mui/material";
import HelperText from "../helper-text";


export default function RHFSlider({ name, helperText, slotProps, ...other }: TRHFSliderProps): JSX.Element {


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
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          <HelperText {...slotProps?.helperText} disableGutters errorMessage={error?.message} helperText={helperText} />
        </Box>
      )}
    />

  )


}