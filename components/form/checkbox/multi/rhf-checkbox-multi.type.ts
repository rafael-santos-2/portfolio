import { CheckboxProps, FormControlProps, FormGroupProps, FormHelperTextProps, FormLabelProps } from "@mui/material";

export type TRHFMultiCheckboxProps = FormGroupProps & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  slotProps?: {
    wrapper?: FormControlProps;
    checkbox?: CheckboxProps;
    formLabel?: FormLabelProps;
    helperText?: FormHelperTextProps;
  };
};