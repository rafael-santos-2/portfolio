// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { IPopupConfirm } from "./popup-confirm.type";
import { Popup, Popup_header } from '@/components/popup';
import { Button, Typography } from "@mui/material";
import { useTranslate } from '@/providers/language/use-locales';
import css from "./popup-confirm.module.css";


export default function Popup_confirm({ open , title, description, confirm, cancel , loading, onClose }: IPopupConfirm): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Popup
      open={open||false}
      onClose={() => { if (!loading) onClose?.(false); }}
      position={{horizontal:"center" , vertical:"center"}}
    >

      <Popup_header title={title} closeable={false} />

      <div className={ css.body }>
        <Typography variant="body2">{description}</Typography>
      </div>


      <div className={css.actions}>

        <Button fullWidth variant="outlined" color={cancel?.color} disabled={loading} onClick={() => onClose?.(false)}>
          {cancel?.label || t('confirm.cancel')}
        </Button>

        <Button fullWidth variant="contained" color={confirm?.color || "primary"} loading={loading} disabled={loading} onClick={() => onClose?.(true)}>
          {confirm?.label || t('confirm.confirm')}
        </Button>

      </div>

    </Popup>

  )


}
