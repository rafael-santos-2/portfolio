import { BoxProps, FormHelperTextProps, SliderProps } from "@mui/material";

export type TRHFSliderProps = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxProps;
    helperText?: FormHelperTextProps;
  };
};