import { BoxProps, FormHelperTextProps, RatingProps } from "@mui/material";

export type TRHFRatingProps = RatingProps & {
  name: string;
  helperText?: React.ReactNode;
  slotProps?: {
    wrapper?: BoxProps;
    helperText?: FormHelperTextProps;
  };
};