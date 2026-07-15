import { IPopup } from "@/components/popup";

export interface IPopupLogin extends Omit<IPopup, "open" | "onClose"> {

  open?: boolean;
  onClose?: (success: boolean) => void;

}