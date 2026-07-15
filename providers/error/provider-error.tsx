'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useEffect } from 'react';
import { ContextErrorLogs } from './context-error';
import { logger } from '@/utils/logger';
// ----------------------------------------------------------------------------------------------------


// TYPES
// ----------------------------------------------------------------------------------------------------
type TProps = {
  children: React.ReactNode;
};
// ----------------------------------------------------------------------------------------------------


// PROVIDER
// ----------------------------------------------------------------------------------------------------
export default function Provider_errors({ children }: TProps): JSX.Element {


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {

    function handle_error(event: ErrorEvent) {
      logger.error(
        "Unhandled Error",
        event.message || "An unexpected error occurred",
        { action: "crash", metadata: { filename: event.filename, lineno: event.lineno, colno: event.colno, stack: event.error?.stack } }
      );
    }

    function handle_unhandled_rejection(event: PromiseRejectionEvent) {
      const reason = event.reason instanceof Error ? event.reason.message : String(event.reason ?? "Unknown rejection");
      logger.error(
        "Unhandled Promise Rejection",
        reason,
        { action: "crash", metadata: { stack: event.reason instanceof Error ? event.reason.stack : undefined } }
      );
    }

    window.addEventListener('error', handle_error);
    window.addEventListener('unhandledrejection', handle_unhandled_rejection);

    return () => {
      window.removeEventListener('error', handle_error);
      window.removeEventListener('unhandledrejection', handle_unhandled_rejection);
    };

  }, []);


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <ContextErrorLogs.Provider value={{}}>
      {children}
    </ContextErrorLogs.Provider>
  );

}
// ----------------------------------------------------------------------------------------------------
