'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from 'react';
import { TNotificationType } from '@/types/database';
import Icon from '@/components/icon';


// TYPES
// ----------------------------------------------------------------------------------------------------

type TProps = {
  type: TNotificationType;
  size?: number;
};


// HELPERS
// ----------------------------------------------------------------------------------------------------

export const NOTIFICATION_TYPE_COLOR: Record<TNotificationType, string> = {
  info:    'var(--palette-info-main)',
  success: 'var(--palette-success-main)',
  warning: 'var(--palette-warning-main)',
  error:   'var(--palette-error-main)',
  system:  'var(--palette-text-disabled)',
  update:  'var(--palette-secondary-main)',
  message: 'var(--palette-primary-main)',
};

function get_icon(type: TNotificationType, size: number): JSX.Element {
  switch (type) {
    case 'success': return <Icon name='check-circle' size={size} />;
    case 'warning': return <Icon name='warning' size={size} />;
    case 'error':   return <Icon name='alert-circle' size={size} />;
    case 'system':  return <Icon name='settings' size={size} />;
    case 'update':  return <Icon name='changelog' size={size} />;
    case 'message': return <Icon name='profile' size={size} />;
    default:        return <Icon name='info-circle' size={size} />;
  }
}


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function NotificationIcon({ type, size = 20 }: TProps): JSX.Element {


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
    <span style={{ color: NOTIFICATION_TYPE_COLOR[type], display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {get_icon(type, size)}
    </span>
  );

}
