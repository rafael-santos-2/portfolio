// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { PROFILE_PASSWORD_DEFAULT, PROFILE_PASSWORD_SCHEMA, TProfilePasswordSchema } from "./profile-password.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AUTH } from "@/config/firebase/client";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword,  } from "firebase/auth";
import { toast } from "sonner";
import { useTranslate } from "@/providers/language";
import { Form } from "@/components/form";
import css from "./profile-password.module.css";
import { Button, Typography } from "@mui/material";
import { Field } from "@/components/form/fields";


export default function ProfilePassword(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const form = useForm<TProfilePasswordSchema>({
    resolver: zodResolver(PROFILE_PASSWORD_SCHEMA),
    defaultValues: PROFILE_PASSWORD_DEFAULT,
  });

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit( data:TProfilePasswordSchema ):Promise<void> {
    try {
      if (!AUTH.currentUser || !AUTH.currentUser.email) return;
      const credential = EmailAuthProvider.credential(AUTH.currentUser.email, data.password);
      await reauthenticateWithCredential(AUTH.currentUser, credential);
      await updatePassword(AUTH.currentUser!, data.newPassword);
      toast.success(t("profile.password.toasts.updateSuccess"));
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating password:", error);
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast.error(t("profile.password.toasts.wrongCurrentPassword"));
      } else {
        toast.error(t("profile.password.toasts.updateError"));
      }
    }
  }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Form methods={form} onSubmit={form.handleSubmit(submit)} className={ css.container }>
      <Typography variant="subtitle2">{t("profile.password.title")}</Typography>
      <Typography variant="body2">{t("profile.password.description")}</Typography>
      <Field.Password name="password" label={t("profile.password.form.currentPassword")} />
      <Field.Password name="newPassword" label={t("profile.password.form.newPassword")} />
      <Field.Password name="confirmNewPassword" label={t("profile.password.form.confirmNewPassword")} />
      <div className={ css.buttons }>
        <Button type="submit" variant={form.formState.isDirty ? "contained" : "outlined"} color="primary" loading={form.formState.isSubmitting}>
          {t("profile.password.form.submit")}
        </Button>
      </div>
    </Form>

  )


}