// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { TMultiFilePreviewProps } from "../../upload.type";
import { CSSObject, ListItemText, styled } from "@mui/material";
import { mergeClasses, varAlpha } from "minimal-shared/utils";
import { uploadClasses } from "../../classes";
import { file_data, format_data } from "@/utils/file";
import { IconButton } from "@/components/buttons";
import Icon from "@/components/icon";
import { FileThumbnail } from "@/components/file-thumbnail";


const ListRoot = styled('ul', { shouldForwardProp: (prop: string) => !['thumbnail', 'sx'].includes(prop) })<Pick<TMultiFilePreviewProps, 'thumbnail'>>(({ thumbnail, theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  ...(thumbnail && { flexWrap: 'wrap', flexDirection: 'row' }),
}));

const ItemNode = styled('li', { shouldForwardProp: (prop: string) => !['thumbnail', 'sx'].includes(prop) })<Pick<TMultiFilePreviewProps, 'thumbnail'>>(({ thumbnail }) => ({
  ...(thumbnail && { width: 'auto', display: 'inline-flex' }),
}));

const ItemThumbnail = styled('li')(() => ({ display: 'inline-flex' }));

const ItemRow = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 1, 1, 1.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${varAlpha(theme.vars.palette.grey[500], 0.16)}`,
}));


export default function UploadPreviewMultiFiles({ sx, onRemove, lastNode, thumbnail, slotProps, firstNode, files = [], className, ...other }: TMultiFilePreviewProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <ListRoot thumbnail={thumbnail} className={mergeClasses([uploadClasses.uploadMultiPreview, className])} sx={sx} {...other}>

      {firstNode && <ItemNode thumbnail={thumbnail}>{firstNode}</ItemNode>}

      {files.map((file) => {
        const { name, size } = file_data(file);

        if (thumbnail) {
          return (
            <ItemThumbnail key={name}>
              <FileThumbnail
                tooltip
                imageView
                file={file}
                onRemove={() => onRemove?.(file)}
                sx={[
                  (theme): CSSObject => ({
                    width: 80,
                    height: 80,
                    border: `solid 1px ${varAlpha(theme.vars.palette.grey[500], 0.16)}`,
                  }),
                ]}
                slotProps={{ icon: { sx: { width: 36, height: 36 } } }}
                {...slotProps?.thumbnail}
              />
            </ItemThumbnail>
          );
        }

        return (
          <ItemRow key={name}>
            <FileThumbnail file={file} {...slotProps?.thumbnail} />

            <ListItemText
              primary={name}
              secondary={format_data(size)}
              slotProps={{ secondary: { sx: { typography: 'caption' } } }}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Icon name="close" size={16} />
              </IconButton>
            )}
          </ItemRow>
        );
      })}

      {lastNode && <ItemNode thumbnail={thumbnail}>{lastNode}</ItemNode>}

    </ListRoot>

  )


}