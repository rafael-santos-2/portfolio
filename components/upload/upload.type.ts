import { ButtonBaseProps, IconButtonProps, TooltipProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { DropzoneOptions } from "react-dropzone";

export type TFileUploadType = File | string | null;

export type TFilesUploadType = (File | string)[];

export type TUploadProps = DropzoneOptions & {
  error?: boolean;
  square?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
  thumbnail?: boolean;
  helperText?: React.ReactNode;
  placeholder?: React.ReactNode;
  value?: TFileUploadType | TFilesUploadType;
  onDelete?: () => void;
  onUpload?: () => void;
  onRemoveAll?: () => void;
  onRemove?: (file: File | string) => void;
};

export type TSingleFilePreviewProps = React.ComponentProps<'div'> & {
  file: File | string;
  sx?: SxProps<Theme>;
};

export type TUploadPlaceholderProps = React.ComponentProps<'div'> & {
  sx?: SxProps<Theme>;
};

export type TMultiFilePreviewProps = React.ComponentProps<'ul'> & {
  sx?: SxProps<Theme>;
  files: TFilesUploadType;
  lastNode?: React.ReactNode;
  firstNode?: React.ReactNode;
  onRemove: TUploadProps['onRemove'];
  thumbnail: TUploadProps['thumbnail'];
  slotProps?: {
    thumbnail?: Omit<TFileThumbnailProps, 'file'>;
  };
};

export type TFileThumbnailProps = React.ComponentProps<'div'> & {
  tooltip?: boolean;
  file: File | string;
  imageView?: boolean;
  sx?: SxProps<Theme>;
  onDownload?: () => void;
  onRemove?: () => void;
  slotProps?: {
    tooltip?: TooltipProps;
    removeBtn?: IconButtonProps;
    downloadBtn?: ButtonBaseProps;
    img?: React.ComponentProps<'img'> & { sx?: SxProps<Theme> };
    icon?: React.ComponentProps<'img'> & { sx?: SxProps<Theme> };
  };
};