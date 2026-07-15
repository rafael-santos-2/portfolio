'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Popup , Popup_confirm, Popup_header } from '@/components';
import { Header } from '@/components/header';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsPopup(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------


  // STATES
  // ----------------------------------------------------------------------------------------------------

  const [open_center, setOpenCenter] = useState(false);
  const [open_right, setOpenRight] = useState(false);
  const [open_left, setOpenLeft] = useState(false);
  const [open_fullheight, setOpenFullheight] = useState(false);
  const [open_confirm, setOpenConfirm] = useState(false);
  const [open_fullscreen, setOpenFullscreen] = useState(false);
  const confirm_loading = false;


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------

  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <Header title="Popup" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={3}>

          {/* Triggers */}
          <Stack direction="row" flexWrap="wrap" gap={2}>
            <Button variant="contained" onClick={() => setOpenCenter(true)}>Center popup</Button>
            <Button variant="contained" onClick={() => setOpenRight(true)}>Right panel</Button>
            <Button variant="contained" onClick={() => setOpenLeft(true)}>Left panel</Button>
            <Button variant="contained" onClick={() => setOpenFullheight(true)}>Full height</Button>
            <Button variant="contained" onClick={() => setOpenFullscreen(true)}>Full screen</Button>
            <Button variant="outlined" color="warning" onClick={() => setOpenConfirm(true)}>Confirm popup</Button>
          </Stack>

        </Stack>
      </div>

      {/* Center popup */}
      <Popup
        open={open_center}
        title="Center popup"
        onClose={() => setOpenCenter(false)}
        position={{horizontal:"center" , vertical:"center"}}
      >
        <Typography variant="body2">This is a centered popup. It overlays the content in the middle of the screen.</Typography>
      </Popup>

      {/* Right panel */}
      <Popup
        open={open_right}
        title="Right panel"
        onClose={() => setOpenRight(false)}
        position={{horizontal:'right' , vertical:"top"}}
      >
        <Typography variant="body2">This is a right-side panel. Great for edit forms and detail views.</Typography>
      </Popup>

      {/* Left panel */}
      <Popup
        open={open_left}
        title="Left panel"
        onClose={() => setOpenLeft(false)}
        position={{horizontal:"left" , vertical:"top"}}
      >
        <Typography variant="body2">This is a left-side panel.</Typography>
      </Popup>

      {/* Full height */}
      <Popup
        open={open_fullheight}
        title="Full height panel"
        onClose={() => setOpenFullheight(false)}
        style={{ height:"100%" }}
      >
        <Typography variant="body2">This panel stretches the full viewport height.</Typography>
      </Popup>

      {/* Full screen */}
      <Popup
        variant='fullscreen'
        open={open_fullscreen}
        onClose={() => setOpenFullscreen(false)}
      >
        <Popup_header title="Full screen panel" />
        <Typography variant="body2">This panel is fullscreen.</Typography>
      </Popup>

      {/* Confirm */}
      <Popup_confirm
        open={open_confirm}
        title="Confirm action"
        description="Are you sure you want to perform this action? This cannot be undone."
        confirm={{
          label:"Confirm"
        }}
        cancel={{
          label:"Cancel"
        }}
        loading={confirm_loading}
        onClose={() => setOpenConfirm(false)}
      />

    </div>
  );

}
