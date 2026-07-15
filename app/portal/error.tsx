'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { logger } from '@/utils/logger';
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): JSX.Element {


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    logger.error(
      "React Boundary",
      error.message || "An unexpected error occurred",
      { action: "crash", metadata: { stack: error.stack, digest: error.digest } }
    );
  }, [error]);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem', backgroundColor: 'var(--grey-200)', textAlign: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2.5rem 2rem', maxWidth: 460, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

        <span style={{ fontSize: '3rem' }} aria-label="error" role="img">⚠️</span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Typography variant="h5" fontWeight={700} color="error">
            Something went wrong layout
          </Typography>
          <Typography color="textSecondary">
            An unexpected error occurred. You can try reloading the page.
          </Typography>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="contained" color="primary" size="large" onClick={reset}>
            Reload
          </Button>
        </div>

      </div>
    </div>
  );

}
// ----------------------------------------------------------------------------------------------------
