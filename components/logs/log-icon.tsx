'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { TLogAction, TLogSeverity } from '@/types/database';
import Icon from '@/components/icon';


// TYPES
// ----------------------------------------------------------------------------------------------------

type TProps = {
  action: TLogAction;
  severity: TLogSeverity;
  size?: number;
};


// HELPERS
// ----------------------------------------------------------------------------------------------------

export const LOG_SEVERITY_COLOR: Record<TLogSeverity, string> = {
  debug:    'var(--palette-grey-500)',
  info:    'var(--palette-info-main)',
  success: 'var(--palette-success-main)',
  warning: 'var(--palette-warning-main)',
  error:   'var(--palette-error-main)',
};

function get_icon(action: TLogAction, size: number): JSX.Element {
  switch (action) {
    case 'create':  return <Icon name="plus" size={size} />;
    case 'update':  return <Icon name="pencil" size={size} />;
    case 'delete':  return <Icon name="trash" size={size} />;
    case 'process': return <Icon name="play" size={size} />;
    case 'crash':   return <Icon name="error" size={size} />;
    case 'other':   return <Icon name="info" size={size} />;
    default:        return <Icon name="info" size={size} />;
  }
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function LogIcon({ action, severity, size = 20 }: TProps): JSX.Element {


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
    <span style={{ color: LOG_SEVERITY_COLOR[severity], display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {get_icon(action, size)}
    </span>
  );

}
