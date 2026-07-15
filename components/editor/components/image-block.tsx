// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState, useCallback, useRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Popover from '@mui/material/Popover';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from '@/providers/language/use-locales';
import { upload_editor_image } from '@/utils/firebase';
import { editorClasses } from '../classes';
import { Toolbar_item } from './toolbar-item';

import type { TEditorToolbarProps } from '../editor.type';


// ----------------------------------------------------------------------

export function Image_block({ editor }: Pick<TEditorToolbarProps, 'editor'>): JSX.Element | null {


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tab,      setTab]      = useState<0 | 1>(0);
  const [url,      setUrl]      = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setUrl('');
    setTab(0);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = (): void => {
    setAnchorEl(null);
  };

  const insertImage = useCallback((src: string): void => {
    editor?.chain().focus().setImage({ src }).run();
    handleClosePopover();
  }, [editor]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset so same file can be re-selected
    e.target.value = '';
    setUploading(true);
    try {
      const downloadUrl = await upload_editor_image(file);
      insertImage(downloadUrl);
    } catch {
      // Keep popover open so user can retry
    } finally {
      setUploading(false);
    }
  }, [insertImage]);

  const handleInsertUrl = useCallback((): void => {
    if (url.trim()) insertImage(url.trim());
  }, [url, insertImage]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  if (!editor) return null;

  return (
    <>
      <Toolbar_item
        aria-label={t('editor.toolbar.image')}
        className={editorClasses.toolbar.image}
        onClick={handleOpenPopover}
        icon={
          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
        }
      />

      <Popover
        id={anchorEl ? 'image-popover' : undefined}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 0, width: 300, overflow: 'hidden' } } }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: '1px solid', borderColor: 'divider', minHeight: 40 }}
          TabIndicatorProps={{ sx: { height: 2 } }}
        >
          <Tab label={t('editor.image.tabUpload')} sx={{ fontSize: 12, minHeight: 40, py: 0 }} />
          <Tab label={t('editor.image.tabUrl')}    sx={{ fontSize: 12, minHeight: 40, py: 0 }} />
        </Tabs>

        {/* ── Upload tab ──────────────────────────────────────────────────────── */}
        {tab === 0 && (
          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
              {t('editor.image.uploadDescription')}
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              size="small"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              startIcon={uploading ? <CircularProgress size={14} color="inherit" /> : undefined}
            >
              {uploading ? t('editor.image.uploading') : t('editor.image.uploadButton')}
            </Button>
          </Box>
        )}

        {/* ── URL tab ─────────────────────────────────────────────────────────── */}
        {tab === 1 && (
          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
              {t('editor.image.urlDescription')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInsertUrl()}
                sx={{ flex: 1 }}
              />
              <Button variant="contained" size="small" onClick={handleInsertUrl}>
                {t('editor.image.insertButton')}
              </Button>
            </Box>
          </Box>
        )}
      </Popover>
    </>
  );

}