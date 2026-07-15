import { TimePickerProps } from '@mui/lab';
import type { Dayjs } from 'dayjs';

export type TRHFTimePickerProps = TimePickerProps<Dayjs> & {
  name: string;
};
