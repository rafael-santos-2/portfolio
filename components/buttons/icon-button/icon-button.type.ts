import { IconButtonProps, TooltipProps } from "@mui/material";
import { ReactNode } from "react";

export interface IIconButtonProps extends IconButtonProps {
  tooltip?: string;
  tooltipProps?: TooltipProps;
  loading?: boolean;
  children: ReactNode;
}