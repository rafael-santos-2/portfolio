'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import CardFile from '@/components/card-file/card-file';
import { Header } from '@/components/header';
import { Icon } from '@/components';


// DATA
// ----------------------------------------------------------------------------------------------------
const DUMMY_FILES = [
  { path: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg' },
  { path: 'gs://fake-bucket/documents/contract.pdf' },
  { path: 'gs://fake-bucket/reports/q1-2025.csv' },
  { path: 'gs://fake-bucket/presentations/roadmap.pptx' },
  { path: 'gs://fake-bucket/data/export.xlsx' },
  { path: 'gs://fake-bucket/media/demo.mp4' },
];


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsCardFile(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [selected, setSelected] = useState<string | null>(null);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Card File" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={3}>

          {/* Default (no select) */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Default — with delete & actions</Typography>
            <Grid container spacing={2}>
              {DUMMY_FILES.map((f) => (
                <Grid key={f.path} size={{ xs: 6, sm: 4, md: 3 }}>
                  <CardFile
                    path={f.path}
                    onDelete={(path) => console.info('delete', path)}
                    actions={[{ label: 'Share' , icon:<Icon name='file' />, onClick: () => console.info('share', f.path) }]}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>

          {/* Selectable */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Selectable mode</Typography>
            <Grid container spacing={2}>
              {DUMMY_FILES.map((f) => (
                <Grid key={f.path} size={{ xs: 6, sm: 4, md: 3 }}>
                  <CardFile
                    path={f.path}
                    selected={selected === f.path}
                    onSelect={setSelected}
                  />
                </Grid>
              ))}
            </Grid>
            {selected && (
              <Typography variant="caption" color="text.secondary">Selected: {selected}</Typography>
            )}
          </Stack>

          {/* Highlighted */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Highlighted state</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <CardFile path={DUMMY_FILES[0].path} highlighted />
              </Grid>
            </Grid>
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
