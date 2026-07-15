import { TUploadProps } from "@/components/upload/upload.type";
import { BoxProps } from "@mui/material";

export type TRHFUploadProps = TUploadProps & {
  name: string;
  square?: boolean;
  slotProps?: { wrapper?: BoxProps; };
};