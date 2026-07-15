// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { Popover as MuiPopover } from "@mui/material";
import { getPopoverPosition, IPopoverProps } from "./popover.type";


export default function Popover({
  open,
  anchorEl,
  onClose,
  children,
  arrow,
  ...props
}: IPopoverProps) {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { anchorOrigin , transformOrigin } = getPopoverPosition(arrow);

  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
    >
      {children}
    </MuiPopover>
  );


}
