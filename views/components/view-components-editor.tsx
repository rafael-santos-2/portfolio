'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { Header } from '@/components/header';
import { Editor } from '@/components/editor';
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsEditor(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [value, setValue] = useState('');


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Editor" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Default</Typography>
            <Editor
              value={value}
              onChange={setValue}
              placeholder="Write something awesome..."
              fullItem
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Output (HTML)</Typography>
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace', p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}
            >
              {value || '—'}
            </Typography>
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
