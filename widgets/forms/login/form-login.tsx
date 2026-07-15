// ----------------------------------------------------------------------------------------------------
import { useState } from 'react';
import { Alert, Button, InputAdornment, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/providers/authentication/context-authentication';
import { useTranslate } from '@/providers/language/use-locales';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_SIGN_IN_VALUES, IFormLoginProps, SIGN_IN_SCHEMA, TSignInSchemaType } from './form-login.type';

import css from './form-login.module.css';
import { get_error_message } from '@/utils/error';
import { Field, Form } from '@/components/form';
import { IconButton } from '@/components/buttons';
import Icon from '@/components/icon';
import Link from 'next/link';
import { PATHS } from '@/config/paths';
import { useRouter } from 'next/navigation';
// ----------------------------------------------------------------------------------------------------





// ----------------------------------------------------------------------------------------------------
export default function Form_login({ onClose, redirect_path }: IFormLoginProps) {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const ROUTER = useRouter();
  const AUTH = useAuthContext();
  const FORM = useForm<TSignInSchemaType>({
    resolver: zodResolver(SIGN_IN_SCHEMA),
    defaultValues: DEFAULT_SIGN_IN_VALUES,
  });
  const { t } = useTranslate();
  // ----------------------------------------------------------------------------------------------------

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // ----------------------------------------------------------------------------------------------------



  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit(data: TSignInSchemaType): Promise<void> {
    try {

      await AUTH.login( data.email, data.password );
      onClose?.(true);

      if (redirect_path) {
        ROUTER.push(redirect_path);
      }

    } catch (error) {
      console.error(error);
      let feedbackMessage = get_error_message(error);

      switch (feedbackMessage) {
        case "Firebase: Error (auth/user-not-found).":
          feedbackMessage = t("auth.signIn.errors.accountNotFound");
          break;

        case "Firebase: Error (auth/invalid-credential).":
          feedbackMessage = t("auth.signIn.errors.invalidCredentials");
          break;

        case "Firebase: Error (auth/wrong-password).":
          feedbackMessage = t("auth.signIn.errors.invalidCredentials");
          break;

        case "Firebase: Error (auth/user-disabled).":
          feedbackMessage = t("auth.signIn.errors.accountDisabled");
          break;
      
        default:
          feedbackMessage = t("general.error");
          break;
      }

      setErrorMessage(feedbackMessage);
    }
  }
  // ----------------------------------------------------------------------------------------------------



  return(
    <Form methods={FORM} onSubmit={FORM.handleSubmit(submit)} className={ css.form }>

      {!!errorMessage && ( <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert> )}
      
      <Field.Text 
        size='small'
        placeholder='john.doe@example.com'
        name="email" 
        label={t("auth.signIn.form.email")} 
        slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="mail" />
                </InputAdornment>
              ),
            },
          }}
      />

      <Stack gap={1}>

        <Field.Text
          size='small'
          name="password"
          placeholder='••••••••'
          label={t("auth.signIn.form.password")}
          type={showPassword ? 'text' : 'password'}
          slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="lock-close" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      <Icon name="eye" open={showPassword} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
        />

        <Link href={PATHS.AUTH.FORGOT_PASSWORD} className={css.link} >
            {t("auth.signIn.forgotPassword")}
        </Link>

      </Stack>


      <Button
        color="primary"
        type="submit"
        variant="contained"
        loading={FORM.formState.isSubmitting}
        loadingIndicator={t("auth.signIn.form.submitting")}
      >
        {t("auth.signIn.form.submit")}
      </Button>

    </Form>
  )



}