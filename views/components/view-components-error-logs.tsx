'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Button, Typography } from '@mui/material';
import Error_log_panel from '@/components/error-logs/error-log-panel';
import { Header } from '@/components/header';
import { logger } from '@/utils/logger';
import css from './view-components-error-logs.module.css';
// ----------------------------------------------------------------------------------------------------


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function View_components_error_logs(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [crash, set_crash] = useState(false);
  if (crash) throw new Error('Simulated render crash');


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  // Simuleert een onafgehandelde JS exception via window.onerror
  function simulate_unhandled_exception() {
    setTimeout(() => {
      throw new Error('Simulated unhandled exception');
    }, 0);
  }

  // Simuleert een onafgehandelde promise rejection via window.onunhandledrejection
  function simulate_unhandled_rejection() {
    Promise.reject(new Error('Simulated unhandled rejection'));
  }

  // Simuleert een React Error Boundary capture
  function simulate_boundary() {
    logger.error(
      "React Boundary",
      "Simulated React boundary error",
      { action: "crash", metadata: { stack: "\n    at BrokenComponent\n    at div\n    at PageLayout" } }
    );
  }

  // Simuleert een manuele capture zoals je dit in een try/catch blok zou doen
  function simulate_manual_basic() {
    try {
      JSON.parse('{ invalid json }}}');
    } catch (error) {
      logger.error(
        "JSON Parse Error",
        error instanceof Error ? error.message : "Invalid JSON",
        { action: "process", metadata: { context: "JSON.parse demo", input: "{ invalid json }}}" } }
      );
    }
  }

  // Manuele capture met rijke metadata
  function simulate_manual_rich() {
    logger.error(
      "Payment Provider Timeout",
      "Payment provider timeout",
      { action: "process", metadata: { provider: "stripe", order_id: "ord_12345", amount: 49.99, currency: "EUR", retries: 3 } }
    );
  }

  // Simuleert een error met hetzelfde fingerprint als een bestaande — telt op de counter
  function simulate_duplicate() {
    logger.error(
      "Duplicate Error",
      "Duplicate error — counter should increment"
    );
  }


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <div className={css.page}>

      <Header title="Error logs" />

      <div className={css.body}>

        {/* Linkerkolom — simulatie knoppen */}
        <div className={css.column}>

          <div className={css.section}>
            <Typography variant="subtitle2" fontWeight={600}>Simuleer errors</Typography>
            <Typography variant="caption" color="text.disabled">
              Elke knop triggert een ander type error capture. Ververs daarna de panel om het resultaat te zien.
            </Typography>
          </div>

          <div className={css.section}>
            <Typography variant="overline" color="text.disabled">Window handlers (automatisch)</Typography>
            <div className={css.button_group}>
              <Button variant="outlined" color="error" size="small" onClick={() => set_crash(true)}>
                Render crash
              </Button>
             <Button variant="outlined" color="error" size="small" onClick={simulate_unhandled_exception}>
                Unhandled exception
              </Button>
              <Button variant="outlined" color="error" size="small" onClick={simulate_unhandled_rejection}>
                Unhandled rejection
              </Button>
            </div>
          </div>

          <div className={css.section}>
            <Typography variant="overline" color="text.disabled">React boundary (manueel getriggerd)</Typography>
            <div className={css.button_group}>
              <Button variant="outlined" color="warning" size="small" onClick={simulate_boundary}>
                React boundary capture
              </Button>
            </div>
          </div>

          <div className={css.section}>
            <Typography variant="overline" color="text.disabled">Manual captures (try/catch)</Typography>
            <div className={css.button_group}>
              <Button variant="outlined" color="info" size="small" onClick={simulate_manual_basic}>
                Manual — JSON parse error
              </Button>
              <Button variant="outlined" color="info" size="small" onClick={simulate_manual_rich}>
                Manual — met metadata
              </Button>
            </div>
          </div>

          <div className={css.section}>
            <Typography variant="overline" color="text.disabled">Deduplicatie</Typography>
            <Typography variant="caption" color="text.disabled">
              Klik meerdere keren — de counter op hetzelfde log stijgt.
            </Typography>
            <div className={css.button_group}>
              <Button variant="outlined" size="small" onClick={simulate_duplicate}>
                Duplicate error (× counter)
              </Button>
            </div>
          </div>

        </div>

        {/* Rechterkolom — live panel */}
        <div className={css.panel_wrapper}>
          <Error_log_panel height="100%" />
        </div>

      </div>

    </div>
  );

}
// ----------------------------------------------------------------------------------------------------
