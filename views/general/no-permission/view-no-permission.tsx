"use client";

import { useTranslate } from "@/providers/language";
import css from "./view-no-permission.module.css";
import { Button, Typography } from "@mui/material";
import Link from "next/link";


export default function ViewNoPermission() {


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
    <div className={css.container}>
      <div className={css.card}>
        <span className={css.icon} aria-label="no permission" role="img">🚫</span>
        <Typography variant="h5" fontWeight={700} color="error">
          {t("general.noPermission.title")}
        </Typography>
        <Typography color="textSecondary">
          {t("general.noPermission.content1")}<br />
          {t("general.noPermission.content2")}
        </Typography>
        <div className={css.actions}>
          <Button component={Link} href="/" variant="contained" color="primary" size="large">
            {t("general.noPermission.action")}
          </Button>
        </div>
      </div>
    </div>
  );


}
