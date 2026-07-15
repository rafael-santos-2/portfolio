import { TextFieldProps } from "@mui/material";

export type TRHFTextFieldProps = TextFieldProps & {
  name: string;
  formatter?: (value: number) => string;
}