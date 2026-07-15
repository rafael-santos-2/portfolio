// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { forwardRef, JSX } from "react";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { mergeClasses } from "minimal-shared/utils";
import { fileThumbnailClasses } from "./classes";
import { file_data, file_thumb, file_format } from "@/utils/file";
import { FileThumbnailDownloadButton, FileThumbnailRemoveButton } from "./file-thumbnail-action-buttons";
import { TFileThumbnailProps } from "@/components/upload/upload.type";


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export const FileThumbnail = forwardRef<HTMLSpanElement, TFileThumbnailProps>((props, ref): JSX.Element => {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { file, tooltip, onRemove, imageView, slotProps, onDownload, className, sx, ...other } = props;

  const { icon, removeBtn, downloadBtn, tooltip: tooltipProps } = slotProps ?? {};

  const { name, path } = file_data(file);

  const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

  const format = file_format(path ?? previewUrl);


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const renderItem = (): JSX.Element => (
    <ItemRoot
      ref={ref}
      className={mergeClasses([fileThumbnailClasses.root, className])}
      sx={sx}
      {...other}
    >
      {format === 'image' && imageView ? (
        <ItemImg src={previewUrl} className={fileThumbnailClasses.img} {...slotProps?.img} />
      ) : (
        <ItemIcon src={file_thumb(format)} className={fileThumbnailClasses.icon} {...icon} />
      )}

      {onRemove && (
        <FileThumbnailRemoveButton
          onClick={onRemove}
          className={fileThumbnailClasses.removeBtn}
          {...removeBtn}
        />
      )}

      {onDownload && (
        <FileThumbnailDownloadButton
          onClick={onDownload}
          className={fileThumbnailClasses.downloadBtn}
          {...downloadBtn}
        />
      )}
    </ItemRoot>
  );


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  if (tooltip) {
    return (
      <Tooltip
        arrow
        title={name}
        {...tooltipProps}
        slotProps={{
          ...tooltipProps?.slotProps,
          popper: {
            modifiers: [{ name: 'offset', options: { offset: [0, -12] } }],
            ...tooltipProps?.slotProps?.popper,
          },
        }}
      >
        {renderItem()}
      </Tooltip>
    );
  }

  return renderItem();

});

FileThumbnail.displayName = 'FileThumbnail';


// STYLES
// ----------------------------------------------------------------------------------------------------
const ItemRoot = styled('span')(({ theme }) => ({
  width: 36,
  height: 36,
  flexShrink: 0,
  alignItems: 'center',
  position: 'relative',
  display: 'inline-flex',
  justifyContent: 'center',
  borderRadius: typeof theme.shape.borderRadius === 'number'
    ? theme.shape.borderRadius * 1.25
    : `${parseFloat(theme.shape.borderRadius as string) * 1.25}px`,
}));

const ItemIcon = styled('img')(() => ({
  width: '100%',
  height: '100%',
}));

const ItemImg = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
}));
