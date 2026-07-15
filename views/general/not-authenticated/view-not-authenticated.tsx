"use client";

import css from "./view-not-authenticated.module.css";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { PATHS } from "@/config/paths";
import { useTranslate } from "@/providers/language";


export default function ViewNotAuthenticated() {


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
        <span className={css.icon} aria-label="lock" role="img">🔒</span>
        <Typography variant="h5" fontWeight={700} color="primary">
          {t("general.notAuthenticated.title")}
        </Typography>
        <Typography color="textSecondary">
          {t("general.notAuthenticated.content1")}<br />
          {t("general.notAuthenticated.content2")}
        </Typography>
        <div className={css.actions}>
          <Button component={Link} href="/" variant="outlined" color="inherit" size="large">
            {t("general.notAuthenticated.actions.home")}
          </Button>
          <Button component={Link} href={PATHS.AUTH.SIGN_IN} variant="contained" color="primary" size="large">
            {t("general.notAuthenticated.actions.signIn")}
          </Button>
        </div>
      </div>
    </div>
  );


}