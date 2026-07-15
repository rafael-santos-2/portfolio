// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { DEFAULT_FORGOT_PASSWORD_VALUES, FORGOT_PASSWORD_SCHEMA, TForgotPasswordSchemaType } from "./forgot-password.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { AUTH } from "@/config/firebase/client";
import css from "./forgot-password.module.css";
import { Logo } from '@/components/logo';
import { Form } from "@/components/form";
import { Button, Link as MuiLink, Typography } from "@mui/material";
import { Field } from "@/components/form/fields";
import Link from "next/link";
import { PATHS } from "@/config/paths";
import { useTranslate } from "@/providers/language";


export default function ForgotPassword(): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();
  const form = useForm<TForgotPasswordSchemaType>({
    resolver: zodResolver(FORGOT_PASSWORD_SCHEMA),
    defaultValues: DEFAULT_FORGOT_PASSWORD_VALUES,
  });

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [isSent, setIsSent] = useState<boolean>(false);
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit(data: TForgotPasswordSchemaType): Promise<void> {
    await sendPasswordResetEmail(AUTH, data.email);
    setIsSent(true);
  }
  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  
  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div className={ css.container }>

      <Logo />

      <Form methods={form} onSubmit={form.handleSubmit(submit)} className={ css.form }>

        <Typography variant="body2">{t("auth.forgotPassword.content")}</Typography>

        <Field.Text name="email" label={t("auth.forgotPassword.form.email")} />

        <Button
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={form.formState.isSubmitting}
          loadingIndicator={t("auth.forgotPassword.form.submitting")}
          disabled={isSent}
        >
          {isSent ? t("auth.forgotPassword.form.submitted") : t("auth.forgotPassword.form.submit")}
        </Button>

        <MuiLink component={Link} href={PATHS.AUTH.SIGN_IN} variant="body2" color="inherit" sx={{ alignSelf: 'center' }}>
          {t("auth.forgotPassword.backToSignIn")}
        </MuiLink>

      </Form>
      
    </div>

  )


}