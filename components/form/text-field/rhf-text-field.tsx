// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useRef, useState } from "react";
import { TRHFTextFieldProps } from "./rhf-text-field.type";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslate } from "@/providers/language";


export default function RHFTextField({ name, formatter, type, onFocus, helperText, slotProps, onBlur, ...other }:TRHFTextFieldProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const { control, setValue } = useFormContext();
  const isNumberType = type === 'number';
  const inputRef = useRef<HTMLInputElement>(null);

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [focused, setFocused] = useState<boolean>(false);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function getFieldValue(field: ControllerRenderProps<FieldValues, string>): string {
    if (isNumberType && formatter && !focused && field.value != null) {
      return formatter(Number(field.value));
    }
    return field.value ?? '';
  }

  function handleFocus(event:React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, field:ControllerRenderProps<FieldValues, string>): void {
    setFocused(true);
    const isEmpty = field.value === 0 || field.value === "0" || field.value === "" || field.value == null;
    if (isNumberType && inputRef.current && isEmpty) {
      setTimeout(() => inputRef.current?.select(), 10);
    }
    onFocus?.(event);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field:ControllerRenderProps<FieldValues, string>): void {
    const rawValue = event.target.value.replace(/[^0-9.,-]/g, '').replace(',', '.');
    field.onChange(isNumberType ? rawValue : event.target.value);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, field:ControllerRenderProps<FieldValues, string>): void {
    setFocused(false);
    if (isNumberType) {
      const cleaned = event.target.value.replace(/[^0-9.,-]/g, '').replace(',', '.');
      setValue(name, cleaned ? Number(cleaned) : '');
    }
    field.onBlur();
    onBlur?.(event);
  }
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          { ...field }
          fullWidth
          error={!!error}
          value={ getFieldValue(field) }
          type={isNumberType ? 'text' : type}
          helperText={error?.message ? t(error.message)  : helperText}
          onFocus={ (event) => handleFocus(event, field) }
          onChange={ (event) => handleChange(event, field) }
          slotProps={{
            ...slotProps,
            htmlInput: {
              autoComplete: 'off',
              ...slotProps?.htmlInput,
              ...(isNumberType && { inputMode: 'decimal', pattern: '[0-9]*\\.?[0-9]*' }),
            },
          }}
          {...other}
          onBlur={ (event) => handleBlur(event, field) }
        />
      )}
    />

  )


}