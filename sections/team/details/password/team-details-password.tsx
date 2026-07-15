// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { ITeamDetailsPasswordProps, TEAM_PASSWORD_DEFAULT, TEAM_PASSWORD_SCHEMA, TTeamPasswordSchema } from "./team-details-password.type";
import { useTranslate } from "@/providers/language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { password_user } from "@/database/users/users";
import { toast } from "sonner";
import { Field, Form } from "@/components/form";
import css from "./team-details-password.module.css";
import { Button, Typography } from "@mui/material";


export default function TeamDetailsPassword({ user }:ITeamDetailsPasswordProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const form = useForm<TTeamPasswordSchema>({
    mode: "onSubmit",
    resolver: zodResolver(TEAM_PASSWORD_SCHEMA),
    defaultValues: TEAM_PASSWORD_DEFAULT,
  });


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit( data:TTeamPasswordSchema ):Promise<void> {
    try {
      await password_user(user.id, data.newPassword);
      toast.success(t("team.password.toasts.updateSuccess"));
      form.reset();
    } catch (error) {
      console.error("[TEAM PASSWORD] Cannot submit form.", error);
      toast.error(t("team.password.toasts.updateError"));
    }
  }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Form methods={form} onSubmit={form.handleSubmit(submit)} className={ css.container }>
      <Typography variant="subtitle2">{t("team.password.title")}</Typography>
      <Typography variant="body2">{t("team.password.description")}</Typography>
      <Field.Password name="newPassword" label={t("team.password.form.newPassword")} />
      <Field.Password name="confirmNewPassword" label={t("team.password.form.confirmNewPassword")} />
      <div className={ css.buttons }>
        <Button type="submit" variant={form.formState.isDirty ? "contained" : "outlined"} color="primary" loading={form.formState.isSubmitting}>
          {t("team.password.form.submit")}
        </Button>
      </div>
    </Form>

  )


}