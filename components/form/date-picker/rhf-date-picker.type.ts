import { DatePickerProps } from '@mui/lab';
import type { Dayjs } from 'dayjs';

export type TRHFDatePickerProps = DatePickerProps<Dayjs> & {
  name: string;
};