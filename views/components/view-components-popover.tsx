'use client';

// IMPORTS
// ----------------------------------------------------------------------------------------------------
import { JSX } from 'react';
import { Button, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { usePopover } from 'minimal-shared/hooks';
import { Popover } from '@/components/popover';
import { Header } from '@/components/header';


// COMPONENT
// ----------------------------------------------------------------------------------------------------
export default function ViewComponentsPopover(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------

  const popover_tr = usePopover();
  const popover_tl = usePopover();
  const popover_br = usePopover();
  const popover_bl = usePopover();


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

      <Header title="Popover" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <Stack spacing={4}>

          {/* Arrow positions */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Positions</Typography>
            <Stack direction="row" gap={2} flexWrap="wrap">

              <Button variant="outlined" onClick={(e) => popover_tr.onOpen(e)}>Top-right</Button>
              <Popover anchorEl={popover_tr.anchorEl} open={popover_tr.open} onClose={popover_tr.onClose} arrow="top-right">
                <MenuList>
                  <MenuItem onClick={popover_tr.onClose}>Item one</MenuItem>
                  <MenuItem onClick={popover_tr.onClose}>Item two</MenuItem>
                  <MenuItem onClick={popover_tr.onClose}>Item three</MenuItem>
                </MenuList>
              </Popover>

              <Button variant="outlined" onClick={(e) => popover_tl.onOpen(e)}>Top-left</Button>
              <Popover anchorEl={popover_tl.anchorEl} open={popover_tl.open} onClose={popover_tl.onClose} arrow="top-left">
                <MenuList>
                  <MenuItem onClick={popover_tl.onClose}>Item one</MenuItem>
                  <MenuItem onClick={popover_tl.onClose}>Item two</MenuItem>
                  <MenuItem onClick={popover_tl.onClose}>Item three</MenuItem>
                </MenuList>
              </Popover>

              <Button variant="outlined" onClick={(e) => popover_br.onOpen(e)}>Bottom-right</Button>
              <Popover anchorEl={popover_br.anchorEl} open={popover_br.open} onClose={popover_br.onClose} arrow="bottom-right">
                <MenuList>
                  <MenuItem onClick={popover_br.onClose}>Item one</MenuItem>
                  <MenuItem onClick={popover_br.onClose}>Item two</MenuItem>
                  <MenuItem onClick={popover_br.onClose}>Item three</MenuItem>
                </MenuList>
              </Popover>

              <Button variant="outlined" onClick={(e) => popover_bl.onOpen(e)}>Bottom-left</Button>
              <Popover anchorEl={popover_bl.anchorEl} open={popover_bl.open} onClose={popover_bl.onClose} arrow="bottom-left">
                <MenuList>
                  <MenuItem onClick={popover_bl.onClose}>Item one</MenuItem>
                  <MenuItem onClick={popover_bl.onClose}>Item two</MenuItem>
                  <MenuItem onClick={popover_bl.onClose}>Item three</MenuItem>
                </MenuList>
              </Popover>

            </Stack>
          </Stack>

        </Stack>
      </div>

    </div>
  );

}
