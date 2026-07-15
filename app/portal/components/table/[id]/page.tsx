'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from 'react';
import { useParams } from 'next/navigation';
import { Typography } from '@mui/material';
import { Header } from '@/components/header';
import { PATHS } from '@/config/paths';
// ----------------------------------------------------------------------------------------------------


// PAGE
// ----------------------------------------------------------------------------------------------------
export default function PageComponentsTableDetail(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { id } = useParams<{ id: string }>();


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

      <Header
        title={`Detail — rij ${id}`}
        back={PATHS.PLATFORM.COMPONENTS.TABLE}
      />

      <div style={{ padding: 24 }}>
        <Typography variant="body2" color="text.secondary">
          Tijdelijke detail pagina om scroll-herstel te testen. Gebruik de back-knop in de header, de browser back-knop, of de browser gesture om terug te gaan naar de lijst.
        </Typography>
      </div>

    </div>
  );


}
// ----------------------------------------------------------------------------------------------------
