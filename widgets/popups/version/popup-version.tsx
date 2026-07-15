import { Popup, Popup_header } from "@/components/popup";
import { IPopupVersion } from "./popup-version.type";
import { Icon } from "@/components";
import Changelog from "@/sections/changelog/changelog";




export default function Popup_version({ patches , open , onClose , ...props }:IPopupVersion) {
  
  return(
    <Popup open={open || false} style={{ width:400 }} onClose={() => onClose?.()} {...props} >

      <Popup_header
        title="What's new"
        actions={[
          {
            fix: true,
            label: "Got it",
            variant: "contained",
            color: "primary",
            icon: <Icon name="check" />,
            onClick: onClose,
          }
        ]}
      />
      
      <Changelog changelog={patches} />

    </Popup>
  )

}