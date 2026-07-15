// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TRHFTimePickerProps } from "./rhf-time-picker.type";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import Icon from "@/components/icon";
import { TextFieldProps } from "@mui/material";

export default function RHFTimePicker({ name, slotProps, ...other }: TRHFTimePickerProps): JSX.Element {
  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { control } = useFormContext();

  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handleChange(field: ControllerRenderProps<FieldValues, string>, newValue: PickerValue) {
    if (!newValue || !dayjs(newValue).isValid()) {
      field.onChange(null);
    } else {
      field.onChange(dayjs(newValue).format());
    }
  }

  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          {...field}
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => handleChange(field, newValue)}
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
  );
}
