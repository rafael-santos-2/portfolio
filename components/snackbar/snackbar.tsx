"use client";

import { Portal } from "@mui/material";
import { JSX } from "react";
import { snackbarClasses } from "./classes";
import { SnackbarRoot } from "./styles";
import { default as Icon } from "../icon";


export default function Snackbar(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Portal>
      <SnackbarRoot
        gap={0}
        closeButton
        offset={16}
        visibleToasts={5}
        position="top-center"
        className={snackbarClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: snackbarClasses.toast,
            icon: snackbarClasses.icon,
            // content
            content: snackbarClasses.content,
            title: snackbarClasses.title,
            description: snackbarClasses.description,
            // button
            actionButton: snackbarClasses.actionButton,
            cancelButton: snackbarClasses.cancelButton,
            closeButton: snackbarClasses.closeButton,
            // state
            default: snackbarClasses.default,
            info: snackbarClasses.info,
            error: snackbarClasses.error,
            success: snackbarClasses.success,
            warning: snackbarClasses.warning,
          },
        }}
        icons={{
          loading: <span className={snackbarClasses.loadingIcon} />,
          info: <Icon name="info-circle" className={snackbarClasses.iconSvg} />,
          success: <Icon name="check-circle" className={snackbarClasses.iconSvg} />,
          warning: <Icon name="warning" className={snackbarClasses.iconSvg} />,
          error: <Icon name="alert-circle" className={snackbarClasses.iconSvg} />,
        }}
      />
    </Portal>

  )


}