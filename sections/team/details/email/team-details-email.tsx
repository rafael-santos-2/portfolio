// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect } from "react";
import { ITeamEmailProps, TEAM_EMAIL_DEFAULT, TEAM_EMAIL_SCHEMA, TTeamEmailSchema } from "./team-details-email.type";
import { useTranslate } from "@/providers/language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { update_user } from "@/database/users/users";
import { toast } from "sonner";
import { Field, Form } from "@/components/form";
import css from "./team-details-email.module.css";
import { Button, Typography } from "@mui/material";


export default function TeamDetailEmail({ user }:ITeamEmailProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  
  const form = useForm<TTeamEmailSchema>({
    mode: "onSubmit",
    resolver: zodResolver(TEAM_EMAIL_SCHEMA),
    defaultValues: TEAM_EMAIL_DEFAULT,
  })

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit( data:TTeamEmailSchema ):Promise<void> {
    try {
      await update_user( user.id, { email: data.email } )
      toast.success(t("team.email.toasts.updateSuccess"))
      form.reset(data);
    } catch (error) {
      console.error(`[TEAM EMAIL] Cannot submit form.` , error);
      toast.error(t("team.email.toasts.updateError"))
    }
  }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    form.reset({ ...TEAM_EMAIL_DEFAULT, email: user.email || "" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Form methods={form} onSubmit={form.handleSubmit(submit)} className={ css.container }>
      <Typography variant="subtitle2">{t("team.email.title")}</Typography>
      <Typography variant="body2">{t("team.email.description")}</Typography>
      <Field.Text name="email" label={t("team.email.form.email")} />
      <div className={ css.buttons }>
        <Button type="submit" variant={form.formState.isDirty ? "contained" : "outlined"} color="primary" loading={form.formState.isSubmitting}>
          {t("team.email.form.submit")}
        </Button>
      </div>
    </Form>

  )


}