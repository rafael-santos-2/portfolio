import { BoxProps, FormControlLabelProps, FormHelperTextProps, SwitchProps } from "@mui/material";

export type TRHFSwitchProps = Omit<FormControlLabelProps, 'control'> & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxProps;
    switch?: SwitchProps;
    helperText?: FormHelperTextProps;
  };
};