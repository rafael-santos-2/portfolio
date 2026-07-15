import { TextFieldProps } from "@mui/material";

export type TRHFSelectProps = TextFieldProps & {
  name: string;
  children: React.ReactNode;
};