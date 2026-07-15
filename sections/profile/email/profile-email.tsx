// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect } from "react";
import { IProfileEmailProps, PROFILE_EMAIL_DEFAULT, PROFILE_EMAIL_SCHEMA, TProfileEmailSchema } from "./profile-email.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { update_user } from "@/database/users/users";
import { useTranslate } from "@/providers/language";
import css from "./profile-email.module.css";
import { Form } from "@/components/form";
import { Button, Typography } from "@mui/material";
import { Field } from "@/components/form/fields";


export default function ProfileEmail({ user }:IProfileEmailProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  
  const form = useForm<TProfileEmailSchema>({
    mode: "onSubmit",
    resolver: zodResolver(PROFILE_EMAIL_SCHEMA),
    defaultValues: PROFILE_EMAIL_DEFAULT,
  })

  
  // STATES
  // ----------------------------------------------------------------------------------------------------

  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit( data:TProfileEmailSchema ):Promise<void> {
    try {
      await update_user( user.id, { email: data.email } )
      toast.success(t("profile.email.toasts.updateSuccess"))
      form.reset(data);
    } catch (error) {
      console.error(`[PROFILE EMAIL] Cannot submit form.` , error);
      toast.error(t("profile.email.toasts.updateError"))
    }
  }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    form.reset({ ...PROFILE_EMAIL_DEFAULT, email: user.email || "" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Form methods={form} onSubmit={form.handleSubmit(submit)} className={ css.container }>
      <Typography variant="subtitle2">{t("profile.email.title")}</Typography>
      <Typography variant="body2">{t("profile.email.description")}</Typography>
      <Field.Text name="email" label={t("profile.email.form.email")} />
      <div className={ css.buttons }>
        <Button type="submit" variant={form.formState.isDirty ? "contained" : "outlined"} color="primary" loading={form.formState.isSubmitting}>
          {t("profile.email.form.submit")}
        </Button>
      </div>
    </Form>

  )


}