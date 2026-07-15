'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Tabs } from '@/components/tabs';
import { Header } from '@/components/header';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsTabs(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [tab1, setTab1] = useState('one');
  const [tab2, setTab2] = useState('all');
  const [tab3, setTab3] = useState('a');


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Tabs" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          {/* Basic tabs */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Basic tabs</Typography>
            <Tabs
              value={tab1}
              onChange={setTab1}
              tabs={[
                { value: 'one',   label: 'One' },
                { value: 'two',   label: 'Two' },
                { value: 'three', label: 'Three' },
              ]}
            />
            <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
              <Typography variant="body2">Active tab: <strong>{tab1}</strong></Typography>
            </Box>
          </Stack>

          {/* Tabs with counts */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Tabs with counts</Typography>
            <Tabs
              value={tab2}
              onChange={setTab2}
              tabs={[
                { value: 'all',      label: 'All',      count: 24 },
                { value: 'active',   label: 'Active',   count: 18 },
                { value: 'inactive', label: 'Inactive', count: 6 },
              ]}
            />
            <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
              <Typography variant="body2">Active tab: <strong>{tab2}</strong></Typography>
            </Box>
          </Stack>

          {/* Tabs with colors */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Tabs with custom colors</Typography>
            <Tabs
              value={tab3}
              onChange={setTab3}
              tabs={[
                { value: 'a', label: 'Primary', color: 'var(--palette-primary-main)' },
                { value: 'b', label: 'Success', color: 'var(--palette-success-main)' },
                { value: 'c', label: 'Warning', color: 'var(--palette-warning-main)' },
                { value: 'd', label: 'Error',   color: 'var(--palette-error-main)' },
              ]}
            />
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
