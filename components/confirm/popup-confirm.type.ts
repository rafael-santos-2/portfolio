import { ButtonProps } from "@mui/material";
import { IPopup } from "../popup";

export interface IPopupConfirm extends Omit<IPopup, "open" | "onClose"> {

  title: string;
  description: string;

  confirm?: {
    label?: string;
    color?: ButtonProps["color"];
  };

  cancel?: {
    label?: string;
    color?: ButtonProps["color"];
  };

  loading?: boolean;

  open?: boolean;
  onClose?: (resp:boolean) => void;

}
