import { CheckboxProps, ChipProps, FormControlProps, FormHelperTextProps, InputLabelProps, SelectChangeEvent, SelectProps } from "@mui/material";

export type TRHFMultiSelectProps = FormControlProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: { label: string; value: string }[];
  slotProps?: {
    chip?: ChipProps;
    select?: SelectProps;
    checkbox?: CheckboxProps;
    inputLabel?: InputLabelProps;
    helperText?: FormHelperTextProps;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: SelectChangeEvent<any>) => void;
};