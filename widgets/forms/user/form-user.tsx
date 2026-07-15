// ----------------------------------------------------------------------------------------------------
import { useState } from 'react';
import { Button, InputAdornment, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@/providers/language/use-locales';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormUser, DEFAULT_FORM_USER, TFormUserValues , SCHEMA_USER } from './form-user.type';
import { IconButton , Field, Form } from '@/components';
import { IUser, USER_ROLES } from '@/types';
import { toast } from 'sonner';
import { create_user, update_user } from '@/database';

import css from './form-user.module.css';
import Icon from '@/components/icon';
// ----------------------------------------------------------------------------------------------------





// ----------------------------------------------------------------------------------------------------
export default function Form_user({ user , onClose }: IFormUser) {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const FORM = useForm<TFormUserValues>({
    resolver: zodResolver(SCHEMA_USER),
    defaultValues: { ...DEFAULT_FORM_USER , ...user },
  });
  const { t } = useTranslate();
  const IS_EDIT = !!user;
  // ----------------------------------------------------------------------------------------------------

  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // ----------------------------------------------------------------------------------------------------



  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  function handleClose(user?:IUser): void {

    FORM.reset();
    onClose(user);

  }

  async function submit( data:TFormUserValues ): Promise<void> {
    try {

      let u;
      const image = data.path_avatar instanceof File ? data.path_avatar : undefined;
      
      if(IS_EDIT){

        u = await update_user( user.id , data, image);
        toast.success(t("team.update.toasts.updateSuccess"));

      } else {

        u = await create_user(data, image);
        toast.success(t("team.create.toasts.createSuccess"));

      }

      handleClose(u);

    } catch (error: unknown) {
      console.error("[POPUP CREATE TEAM MEMBER] Cannot create user.", error);
      if ( error instanceof Error && error.message === "EMAIL_EXISTS" ) {
        toast.error(t("team.create.errors.emailInUse"));
      } else {
        toast.error(t("team.create.toasts.createError"));
      }
    }
  }
  // ----------------------------------------------------------------------------------------------------



  return(
    <Form methods={FORM} onSubmit={FORM.handleSubmit(submit)} className={css.form}>

      <div className={css.fields}>

        <Field.UploadAvatar name="path_avatar" slotProps={{ wrapper: { sx: { display: "flex", flexDirection: "column", alignItems: "center" } } }} />

        <Field.Text fullWidth name="firstName" label={t("team.create.form.firstName")} />
        <Field.Text fullWidth name="lastName" label={t("team.create.form.lastName")} />
        <Field.Text fullWidth name="email" label={t("team.create.form.email")} type="email" />

        <Field.Select fullWidth name="role" label={t("team.create.form.role")}>
          {USER_ROLES.map((r) => (
            <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
          ))}
        </Field.Select>

        <Field.Text
          fullWidth
          name="password"
          label={t("team.create.form.password")}
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(v => !v)} edge="end" size="small">
                    <Icon name="eye" open={showPassword} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

      </div>

      <div className={css.actions}>
        <Button fullWidth variant="outlined" color="inherit" disabled={FORM.formState.isSubmitting} onClick={() => handleClose()}>
          {t("team.create.form.cancel")}
        </Button>
        <Button fullWidth variant="contained" color="primary" type="submit" loading={FORM.formState.isSubmitting}>
          {t("team.create.form.submit")}
        </Button>
      </div>

    </Form>
  )



}