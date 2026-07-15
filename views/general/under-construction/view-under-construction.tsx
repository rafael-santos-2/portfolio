"use client";

import { useTranslate } from "@/providers/language";
import css from "./view-under-construction.module.css";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function ViewUnderConstruction() {

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
        <span className={css.icon} aria-label="under construction" role="img">🚧</span>
        <Typography variant="h5" fontWeight={700} color="warning">
          {t("general.underConstruction.title")}
        </Typography>
        <Typography color="textSecondary">
          {t("general.underConstruction.content1")}<br />
          {t("general.underConstruction.content2")}
        </Typography>
        <div className={css.actions}>
          <Button component={Link} href="/" variant="contained" color="primary" size="large">
            {t("general.underConstruction.action")}
          </Button>
        </div>
      </div>
    </div>
  );


}
