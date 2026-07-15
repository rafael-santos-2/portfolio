import { FormControlProps, FormHelperTextProps, FormLabelProps, RadioGroupProps, RadioProps } from "@mui/material";

export type TRHFRadioGroupProps = RadioGroupProps & {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: FormControlProps;
    radio?: RadioProps;
    formLabel?: FormLabelProps;
    helperText?: FormHelperTextProps;
  };
};