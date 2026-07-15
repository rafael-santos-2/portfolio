import { Popup } from "@/components/popup";
import { IPopupUser } from "./popup-user.type";

import css from './popup-user.module.css';
import Form_user from "@/widgets/forms/user/form-user";




export default function Popup_user({ user , open , onClose }:IPopupUser) {
  
  return(
    <Popup open={open || false} style={{ width:400 }} onClose={() => onClose?.()} >

      <div className={ css.container }>

        <Form_user user={user} onClose={onClose || (() => {})} />

      </div>
      
    </Popup>
  )

}