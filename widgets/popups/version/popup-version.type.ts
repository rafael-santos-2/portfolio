import { IPopup } from "@/components/popup";
import { TPatchNote } from "@/types";

export interface IPopupVersion extends Omit<IPopup, "open" | "onClose"> {

  open?: boolean;
  patches: TPatchNote[];
  onClose?: () => void;

}