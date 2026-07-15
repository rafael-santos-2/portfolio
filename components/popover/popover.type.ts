import { PopoverOrigin, PopoverProps } from "@mui/material";


export interface IPopoverProps extends PopoverProps {
  open: boolean;
  anchorEl: Element | null;
  onClose: () => void;
  arrow?: TPopoverArrow;
}

export type TPopoverArrow =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom";

export function getPopoverPosition(arrow?: TPopoverArrow): {
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
} {


  const positions: Record<TPopoverArrow, { anchorOrigin: PopoverOrigin; transformOrigin: PopoverOrigin }> = {
    "top-left": {
      anchorOrigin: { vertical: "top", horizontal: "left" },
      transformOrigin: { vertical: "bottom", horizontal: "left" },
    },
    "top-center": {
      anchorOrigin: { vertical: "top", horizontal: "center" },
      transformOrigin: { vertical: "bottom", horizontal: "center" },
    },
    "top-right": {
      anchorOrigin: { vertical: "top", horizontal: "right" },
      transformOrigin: { vertical: "bottom", horizontal: "right" },
    },
    "bottom-left": {
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      transformOrigin: { vertical: "top", horizontal: "left" },
    },
    "bottom-center": {
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      transformOrigin: { vertical: "top", horizontal: "center" },
    },
    "bottom-right": {
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      transformOrigin: { vertical: "top", horizontal: "right" },
    },
    "left-top": {
      anchorOrigin: { vertical: "top", horizontal: "left" },
      transformOrigin: { vertical: "top", horizontal: "right" },
    },
    "left-center": {
      anchorOrigin: { vertical: "center", horizontal: "left" },
      transformOrigin: { vertical: "center", horizontal: "right" },
    },
    "left-bottom": {
      anchorOrigin: { vertical: "bottom", horizontal: "left" },
      transformOrigin: { vertical: "bottom", horizontal: "right" },
    },
    "right-top": {
      anchorOrigin: { vertical: "top", horizontal: "right" },
      transformOrigin: { vertical: "top", horizontal: "left" },
    },
    "right-center": {
      anchorOrigin: { vertical: "center", horizontal: "right" },
      transformOrigin: { vertical: "center", horizontal: "left" },
    },
    "right-bottom": {
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      transformOrigin: { vertical: "bottom", horizontal: "left" },
    },
  };

  return positions[arrow || "top-left" ];

}
