// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFDatePickerProps } from "./rhf-date-picker.type";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { DATE_PATTERNS } from "@/utils/date";
import Icon from "@/components/icon";
import { TextFieldProps } from "@mui/material";


export default function RHFDatePicker({ name, slotProps, ...other }: TRHFDatePickerProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { control } = useFormContext();
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handelChange (field: ControllerRenderProps<FieldValues, string>, newValue: PickerValue) {
    if (!newValue || !dayjs(newValue).isValid()) {
      field.onChange(null);
    } else {
      field.onChange(dayjs(newValue).format());
    }
  }
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => handelChange(field, newValue)}
          format={DATE_PATTERNS.date}
          slots={{ openPickerIcon: () => <Icon name="calendar" />, ...other?.slots }}
          slotProps={{
            ...slotProps,
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? (slotProps?.textField as TextFieldProps)?.helperText,
              ...slotProps?.textField,
            },
          }}
          {...other}
        />
      )}
    />

  )


}