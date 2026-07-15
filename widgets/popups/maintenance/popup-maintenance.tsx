import { Popup, Popup_header } from "@/components/popup";
import { IPopupMaintenance } from "./popup-maintenance.type";
import { Icon } from "@/components";
import { Typography , Stack} from "@mui/material";
import { formatDate, formatTime } from "@/utils/date";




export default function Popup_maintenance({ maintenance , open , onClose , ...props }:IPopupMaintenance) {
  
  if (!maintenance) return null;

  return(
    <Popup open={open || false} style={{ width:400 }} onClose={() => onClose?.()} {...props} >

      <Popup_header
        title="Gepland onderhoud"
        closeable={false}
        actions={[
          {
            fix: true,
            label: "Got it",
            variant: "contained",
            shape:"button",
            color: "primary",
            icon: <Icon name="check" />,
            onClick: onClose,
          }
        ]}
      />

      <Stack p={2} gap={2} >

        <Typography variant="body1" gutterBottom >
          {maintenance.message || 'Er staat onderhoud gepland aan de applicatie.'}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {formatDate(maintenance.scheduled_start)}&nbsp;&mdash;&nbsp;
          {formatTime(maintenance.scheduled_start)} tot {formatTime(maintenance.scheduled_end)}
        </Typography>

      </Stack>
      

    </Popup>
  )

}