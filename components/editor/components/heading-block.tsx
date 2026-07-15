// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Menu from '@mui/material/Menu';
import { listClasses } from '@mui/material/List';
import ButtonBase, { buttonBaseClasses } from '@mui/material/ButtonBase';

import { useTranslate } from '@/providers/language/use-locales';
import { Toolbar_item } from './toolbar-item';

import type { TEditorToolbarProps } from '../editor.type';

// ----------------------------------------------------------------------

type THeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_LEVELS: THeadingLevel[] = [1, 2, 3, 4, 5, 6];

// ----------------------------------------------------------------------

export function Heading_block({ editor }: Pick<TEditorToolbarProps, 'editor'>): JSX.Element | null {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getActiveLabel = (): string => {
    for (const level of HEADING_LEVELS) {
      if (editor?.isActive('heading', { level })) return t(`editor.heading.heading${level}`);
    }
    return t('editor.heading.paragraph');
  };


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  if (!editor) return null;

  return (
    <>
      <ButtonBase
        id="heading-menu-button"
        aria-label={t('editor.toolbar.headingMenu')}
        aria-controls={anchorEl ? 'heading-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleOpen}
        sx={(theme) => ({
          px: 1,
          gap: 0.5,
          width: 120,
          height: 32,
          borderRadius: 0.75,
          typography: 'body2',
          justifyContent: 'space-between',
          border: `solid 1px ${varAlpha(theme.vars.palette.grey[500], 0.2)}`,
        })}
      >
        {getActiveLabel()}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          {anchorEl
            ? <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
            : <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          }
        </svg>
      </ButtonBase>

      <Menu
        id="heading-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'heading-menu-button' }}
        slotProps={{
          paper: {
            sx: {
              width: 120,
              [`& .${listClasses.root}`]: { gap: 0.5, display: 'flex', flexDirection: 'column' },
              [`& .${buttonBaseClasses.root}`]: {
                px: 1,
                width: 1,
                height: 34,
                borderRadius: 0.75,
                justifyContent: 'flex-start',
                '&:hover': { backgroundColor: 'action.hover' },
              },
            },
          },
        }}
      >
        <Toolbar_item
          component="li"
          label={t('editor.heading.paragraph')}
          active={editor.isActive('paragraph')}
          onClick={() => { handleClose(); editor.chain().focus().setParagraph().run(); }}
        />

        {HEADING_LEVELS.map((level, index) => (
          <Toolbar_item
            key={level}
            aria-label={t(`editor.heading.heading${level}`)}
            component="li"
            label={t(`editor.heading.heading${level}`)}
            active={editor.isActive('heading', { level })}
            onClick={() => { handleClose(); editor.chain().focus().toggleHeading({ level }).run(); }}
            sx={{ fontSize: 18 - index, fontWeight: 'fontWeightBold' }}
          />
        ))}
      </Menu>
    </>
  );

}
