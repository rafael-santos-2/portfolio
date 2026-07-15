'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { createPortal } from 'react-dom';
import { Typography } from '@mui/material';
import css from './maintenance-screen.module.css';
import type { IMaintenance } from '@/types/database';


// HELPERS
// ----------------------------------------------------------------------------------------------------

function format_time(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function format_date(date: Date): string {
  return date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

type TProps = {
  maintenance: IMaintenance;
};

export default function MaintenanceScreen({ maintenance }: TProps): JSX.Element {


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return createPortal(
    <div className={css.overlay}>
      <div className={css.content}>

        <Typography variant="h4">{maintenance.title || 'Onderhoud bezig'}</Typography>

        <Typography variant="body1" color="text.secondary">
          {maintenance.message || 'De applicatie is tijdelijk niet beschikbaar wegens onderhoud. Probeer het later opnieuw.'}
        </Typography>

        <div className={css.times}>
          <Typography variant="body2" color="text.disabled">
            {format_date(maintenance.scheduled_start)}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {format_time(maintenance.scheduled_start)} – {format_time(maintenance.scheduled_end)}
          </Typography>
        </div>

      </div>
    </div>,
    document.body
  );

}
