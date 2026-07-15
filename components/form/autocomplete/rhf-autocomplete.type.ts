import { AutocompleteProps, TextFieldProps } from "@mui/material";

export type TAutocompleteBaseProps = Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AutocompleteProps<any, boolean, boolean, boolean>,
  'renderInput'
>;

export type TRHFAutocompleteProps = TAutocompleteBaseProps & {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  slotProps?: TAutocompleteBaseProps['slotProps'] & {
    textfield?: TextFieldProps;
  };
};