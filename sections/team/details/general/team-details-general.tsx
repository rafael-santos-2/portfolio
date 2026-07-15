// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX, useEffect } from "react";
import { ITeamDetailsGeneralProps, ITeamGeneralSchema, TEAM_GENERAL_DEFAULT, TEAM_GENERAL_SCHEMA } from "./team-details-general.type";
import { useTranslate } from "@/providers/language";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { update_user } from "@/database/users/users";
import { toast } from "sonner";
import { Field, Form } from "@/components/form";
import css from "./team-details-general.module.css";
import { Button } from "@mui/material";


export default function TeamDetailsGeneral({ user }:ITeamDetailsGeneralProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const form = useForm<ITeamGeneralSchema>({
    mode: "onSubmit",
    resolver: zodResolver(TEAM_GENERAL_SCHEMA),
    defaultValues: {
      ...TEAM_GENERAL_DEFAULT,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      path_avatar: user.path_avatar || null,
    },
  })
  
  
  // STATES
  // ----------------------------------------------------------------------------------------------------
  
  
  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------
  async function submit( data:ITeamGeneralSchema ):Promise<void> {
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
      
      toast.success(t("team.general.toasts.updateSuccess"));
      form.reset(data);
    } catch (error) {
      console.error(`[TEAM GENERAL] Cannot submit form.` , error);
      toast.error(t("team.general.toasts.updateError"));
    }
  }

  
  // EFFECTS
  // ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    form.reset({
      ...TEAM_GENERAL_DEFAULT,
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
          <Field.Text name="firstName" label={t("team.general.form.firstName")} />
          <Field.Text name="lastName" label={t("team.general.form.lastName")} />
        </div>
      </div>

      <div className={ css.buttons }>
        <Button type="submit" variant={form.formState.isDirty ? "contained" : "outlined"} color="primary" loading={form.formState.isSubmitting}>
          {t("team.general.form.submit")}
        </Button>
      </div>

    </Form>

  )


}