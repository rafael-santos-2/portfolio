'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { toast } from 'sonner';
import { Header } from '@/components/header';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsSnackbar(): JSX.Element {


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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Snackbar" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          {/* Variants */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Variants</Typography>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Button variant="contained"  color="inherit"  onClick={() => toast('Default message')}>Default</Button>
              <Button variant="contained"  color="info"     onClick={() => toast.info('Info message')}>Info</Button>
              <Button variant="contained"  color="success"  onClick={() => toast.success('Success message')}>Success</Button>
              <Button variant="contained"  color="warning"  onClick={() => toast.warning('Warning message')}>Warning</Button>
              <Button variant="contained"  color="error"    onClick={() => toast.error('Error message')}>Error</Button>
            </Stack>
          </Stack>

          {/* With description */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">With description</Typography>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Button variant="outlined" onClick={() => toast.success('File uploaded', { description: 'contract.pdf has been uploaded successfully.' })}>
                With description
              </Button>
            </Stack>
          </Stack>

          {/* With action */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">With action</Typography>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Button variant="outlined" onClick={() => toast('Item deleted', { action: { label: 'Undo', onClick: () => toast.success('Undo successful') } })}>
                With undo action
              </Button>
            </Stack>
          </Stack>

          {/* Loading */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Loading / promise</Typography>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Button variant="outlined" onClick={() => {
                toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
                  loading: 'Saving changes...',
                  success: 'Changes saved!',
                  error: 'Failed to save.',
                });
              }}>
                Promise toast
              </Button>
            </Stack>
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
