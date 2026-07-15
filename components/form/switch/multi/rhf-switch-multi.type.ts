import { FormControlProps, FormGroupProps, FormHelperTextProps, FormLabelProps, SwitchProps } from "@mui/material";

export type TRHFMultiSwitchProps = FormGroupProps & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  slotProps?: {
    wrapper?: FormControlProps;
    switch: SwitchProps;
    formLabel?: FormLabelProps;
    helperText?: FormHelperTextProps;
  };
};