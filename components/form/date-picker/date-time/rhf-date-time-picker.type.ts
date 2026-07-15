import { DateTimePickerProps } from '@mui/lab';
import type { Dayjs } from 'dayjs';

export type TRHFDateTimePickerProps = DateTimePickerProps<Dayjs> & {
  name: string;
};
