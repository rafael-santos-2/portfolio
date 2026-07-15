"use client";

// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { usePopover } from "minimal-shared/hooks";
import { varAlpha, mergeClasses } from "minimal-shared/utils";
import { ButtonBase, MenuItem, MenuList, styled } from "@mui/material";
import Icon from "@/components/icon";
import { Popover } from '@/components/popover';
import { chartClasses } from "../classes";
import type { TChartSelectProps } from "../chart.type";


// COMPONENT
// ----------------------------------------------------------------------------------------------------

export default function ChartSelect({ options, value, onChange, sx, className, ...other }: TChartSelectProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const popover = usePopover();


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <>

      <SelectButton
        onClick={popover.onOpen}
        className={mergeClasses([chartClasses.select, className])}
        sx={sx}
        {...other}
      >
        {value}
        <Icon name="chevron" direction={popover.open ? "up" : "down"} size={16} />
      </SelectButton>

      <Popover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose} arrow="bottom-right">
        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === value}
              onClick={() => {
                popover.onClose();
                onChange(option);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

    </>

  );


}


// STYLES
// ----------------------------------------------------------------------------------------------------

const SelectButton = styled(ButtonBase)(({ theme }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  gap: theme.spacing(1.5),
  height: 34,
  borderRadius: theme.shape.borderRadius,
  ...theme.typography.subtitle2,
  border: `solid 1px ${varAlpha(theme.vars.palette.grey[500], 0.24)}`,
}));
