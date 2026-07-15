// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect } from "react";
import { IProfileGeneralProps, IProfileGeneralSchema, PROFILE_GENERAL_DEFAULT, PROFILE_GENERAL_SCHEMA } from "./profile-general.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslate } from "@/providers/language";
import { update_user } from "@/database/users/users";
import { Form } from "@/components/form";
import css from "./profile-general.module.css";
import { Field } from "@/components/form/fields";
import { Button } from "@mui/material";


export default function ProfileGeneral({ user }:IProfileGeneralProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const form = useForm<IProfileGeneralSchema>({
    mode: "onSubmit",
    resolver: zodResolver(PROFILE_GENERAL_SCHEMA),
    defaultValues: {
      ...PROFILE_GENERAL_DEFAULT,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      path_avatar: user.path_avatar || null,
    },
  })
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit( data:IProfileGeneralSchema ):Promise<void> {
    try {

      const isNewAvatar = data.path_avatar instanceof File;
      const isAvatarCleared = data.path_avatar === null && user.path_avatar;

      await update_user(
        user.id,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          ...(isAvatarCleared ? { path_avatar: null } : {}),
        },
        isNewAvatar ? data.path_avatar : undefined,
      );
      
      toast.success(t("profile.general.toasts.updateSuccess"));
      form.reset(data);
    } catch (error) {
      console.error(`[PROFILE GENERAL] Cannot submit form.` , error);
      toast.error(t("profile.general.toasts.updateError"));
    }
  }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    form.reset({
      ...PROFILE_GENERAL_DEFAULT,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      path_avatar: user.path_avatar || null,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  
  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <Form methods={form} onSubmit={form.handleSubmit(submit)} className={ css.container }>

      <div className={ css.form }>
        <Field.UploadAvatar name="path_avatar" />
        <div className={ css.fields }>
          <Field.Text name="firstName" label={t("profile.general.form.firstName")} />
          <Field.Text name="lastName" label={t("profile.general.form.lastName")} />
        </div>
      </div>

      <div className={ css.buttons }>
        <Button type="submit" variant={form.formState.isDirty ? "contained" : "outlined"} color="primary" loading={form.formState.isSubmitting}>
          {t("profile.general.form.submit")}
        </Button>
      </div>

    </Form>

  )


}