import { IPopup } from "@/components/popup";
import { IUser } from "@/types";

export interface IPopupUser extends Omit<IPopup, "open" | "onClose"> {

  open?: boolean;
  user?: IUser;
  onClose?: (user?: IUser) => void;

}