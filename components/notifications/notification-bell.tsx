'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import { useNotificationsContext } from '@/providers/notifications/context-notifications';
import { Popover } from '@/components/popover';
import NotificationPanel from './notification-panel';
import Icon from '@/components/icon';


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function NotificationBell(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const { unread_count } = useNotificationsContext();


  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [ anchor , set_anchor ] = useState<HTMLButtonElement|null>(null);

  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <IconButton onClick={(e) => set_anchor(e.currentTarget)} color="inherit" size="small">
        <Badge badgeContent={unread_count > 0 ? unread_count : undefined} color="error" max={99}>
          <Icon name="bell" size={22} />
        </Badge>
      </IconButton>

      <Popover anchorEl={anchor} open={Boolean(anchor)} onClose={() => set_anchor(null)} anchorOrigin={{horizontal:"right" , vertical:"top"}} slotProps={{ paper: { sx:{ overflow: 'hidden' }} }}>
        <NotificationPanel onClose={() => set_anchor(null)} />
      </Popover>
    </>
  );

}
