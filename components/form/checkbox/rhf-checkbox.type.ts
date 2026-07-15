import { BoxProps, CheckboxProps, FormControlLabelProps, FormHelperTextProps } from "@mui/material";

export type TRHFCheckboxProps = Omit<FormControlLabelProps, 'control'> & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxProps;
    checkbox?: CheckboxProps;
    helperText?: FormHelperTextProps;
  };
};