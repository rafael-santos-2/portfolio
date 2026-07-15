"use client";

import { useTranslate } from "@/providers/language";
import css from "./view-not-found.module.css";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function ViewNotFound() {

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
        <span className={css.icon} aria-label="not found" role="img">❓</span>
        <Typography variant="h5" fontWeight={700} color="error">
          {t("general.notFound.title")}
        </Typography>
        <Typography color="textSecondary">
          {t("general.notFound.content1")}<br />
          {t("general.notFound.content2")}
        </Typography>
        <div className={css.actions}>
          <Button component={Link} href="/" variant="contained" color="primary" size="large">
            {t("general.notFound.action")}
          </Button>
        </div>
      </div>
    </div>
  );


}