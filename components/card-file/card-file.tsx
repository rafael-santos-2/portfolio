'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect, useState } from 'react';
import { Card, IconButton, MenuItem, MenuList, Tooltip, Typography } from '@mui/material';
import { usePopover } from 'minimal-shared/hooks';

import { getUrl } from '@/utils/firebase';
import { file_format, file_name_by_url, file_thumb_icon } from '@/utils/file';
import Icon from '@/components/icon';
import { Popover } from '@/components/popover';
import { Popup } from '@/components/popup';

import { useTranslate } from '@/providers/language/use-locales';
import type { ICardFileProps } from './card-file.type';
import css from './card-file.module.css';


// HELPERS
// ----------------------------------------------------------------------------------------------------

function is_local_url(path: string): boolean {
  return path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:');
}

async function download_file(url: string, name: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(blobUrl);
}


export default function CardFile({
  path,
  previewPath,
  onDelete,
  actions,
  highlighted,
  onSelect,
  selected,
}: ICardFileProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { t } = useTranslate();

  const name = file_name_by_url(path) ?? path;
  const format = file_format(path);
  const isImage = format === 'image';
  const hasActions = true;


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [src, setSrc] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const popover = usePopover();


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  async function handleDownload() {
    if (!src) return;
    await download_file(src, name);
    popover.onClose();
  }

  async function handleDelete() {
    onDelete?.(path);
    popover.onClose();
  }

  function handlePreviewClick() {
    if (onSelect) return;
    if (isImage && src) {
      setImageOpen(true);
    } else if (src) {
      window.open(src, '_blank');
    }
  }


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (is_local_url(path)) {
      Promise.resolve(path).then((url) => setSrc(url));
      return;
    }
    getUrl(path).then((url) => setSrc(url)).catch((err) => console.error(err));
  }, [path]);

  useEffect(() => {
    if (!previewPath) return;
    if (is_local_url(previewPath)) {
      Promise.resolve(previewPath).then((url) => setPreviewSrc(url));
      return;
    }
    getUrl(previewPath).then((url) => setPreviewSrc(url)).catch((err) => console.error(err));
  }, [previewPath]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  const showThumb = previewSrc ?? (isImage ? src : null);
  const thumbIcon = !showThumb ? file_thumb_icon(path) : null;

  return (
    <>

      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          width: '100%',
          padding: '8px',
          gap: '8px',
          alignSelf: 'stretch',
          ...(highlighted && { border: '2px solid var(--palette-warning-dark)' }),
          ...(onSelect && { cursor: 'pointer' }),
          ...(selected && { border: '2px solid var(--palette-primary-main)' }),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect?.(path)}
      >

        <div className={css.preview} onClick={handlePreviewClick}>
          {showThumb ? (
            // eslint-disable-next-line @next/next/no-img-element -- user-uploaded thumbnail from Firebase Storage / blob URL; next/image can't optimize arbitrary srcs
            <img className={css.previewImage} src={showThumb} alt={name} />
          ) : (
            <div className={css.previewThumb}>{thumbIcon}</div>
          )}
        </div>

        <Tooltip title={name}>
          <div className={css.meta}>
            <Typography variant="body2">{name}</Typography>
          </div>
        </Tooltip>

        {hasActions && (
          <div className={`${css.actions} ${(!hovered && !popover.open) || onSelect ? css.hidden : ''}`}>
            <IconButton
              onClick={popover.onOpen}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: '0 8px 0 8px',
                '&:hover': { backgroundColor: 'background.paper' },
              }}
            >
              <Icon name="dots-more" direction='vertical' />
            </IconButton>
          </div>
        )}

      </Card>


      <Popover anchorEl={popover.anchorEl} open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <MenuList>

          <MenuItem onClick={handleDownload}>
            <Icon name="download" />
            {t('cardFile.download')}
          </MenuItem>

          {actions?.map((action, i) => (
            <MenuItem
              key={i}
              onClick={() => { action.onClick(); popover.onClose(); }}
              disabled={action.isDisabled}
              sx={{ color: action.color ?? 'text.primary' }}
            >
              {action.icon}
              {action.label}
            </MenuItem>
          ))}

          {onDelete && (
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Icon name="trash" />
              {t('cardFile.delete')}
            </MenuItem>
          )}

        </MenuList>
      </Popover>


        <Popup
          title={name}
          open={ !!(imageOpen && src) }
          onClose={() => setImageOpen(false)}
          position={{horizontal:"center", vertical:"center"}}
          style={{
            width:800,
            maxWidth:"90vw"
          }}
        >
          <div className={css.imagePopup}>
            {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded image from Firebase Storage / blob URL; next/image can't optimize arbitrary srcs */}
            <img src={src || undefined} alt={name} />
          </div>
        </Popup>

    </>
  );

}
