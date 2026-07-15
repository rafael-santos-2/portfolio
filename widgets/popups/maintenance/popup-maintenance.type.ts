import { IPopup } from "@/components/popup";
import { IMaintenance } from "@/types";

export interface IPopupMaintenance extends Omit<IPopup, "open" | "onClose"> {

  maintenance: IMaintenance | null;
  open?: boolean;
  onClose?: () => void;

}