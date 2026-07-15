'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { IMaintenance } from '@/types/database';
import { Header } from '@/components/header';
import Popup_maintenance from '@/widgets/popups/maintenance/popup-maintenance';


// DATA
// ----------------------------------------------------------------------------------------------------
const BASE = { id_creator: null, id_updater: null, id_deleter: null, date_updated: null, is_deleted: false, date_deleted: null };

const DUMMY_MAINTENANCE: IMaintenance = {
  ...BASE,
  id: 'maint_001',
  date_created: new Date(),
  title: 'Scheduled maintenance',
  message: 'We will be performing scheduled maintenance. The application will be temporarily unavailable.',
  scheduled_start: new Date(Date.now() + 1000 * 60 * 60 * 2),
  scheduled_end: new Date(Date.now() + 1000 * 60 * 60 * 4),
  is_active: false,
};


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsMaintenance(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [show_upcoming, setShowUpcoming] = useState(false);


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Maintenance" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          {/* Upcoming popup */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Upcoming maintenance popup</Typography>
            <Stack direction="row" gap={2}>
              <Button variant="contained" onClick={() => setShowUpcoming(true)}>
                Show upcoming popup
              </Button>
            </Stack>
          </Stack>

        </Stack>
      </div>

      <Popup_maintenance
        open={show_upcoming}
        maintenance={DUMMY_MAINTENANCE}
        onClose={() => setShowUpcoming(false)}
      />

    </div>
  );

}
