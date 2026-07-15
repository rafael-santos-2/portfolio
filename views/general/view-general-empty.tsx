'use client';

import { JSX } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Header } from '@/components/header';
import ViewEmpty from './empty/view-empty';

export default function ViewGeneralEmpty(): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header title="Empty" />
      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Default</Typography>
            <ViewEmpty />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">With title & description</Typography>
            <ViewEmpty
              title="No results found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">With action</Typography>
            <ViewEmpty
              title="No documents yet"
              description="Upload your first document to get started."
              actions={<Button variant="contained">Upload document</Button>}
            />
          </Stack>

        </Stack>
      </div>
    </div>
  );
}
