"use client";

import { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MenuItem, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, Form } from "@/components/form";
import { update_member } from "@/database/members/members";
import { MEMBER_ROLES } from "@/types/database";
import {
  IMemberDetailsGeneralProps,
  MEMBER_GENERAL_DEFAULT,
  MEMBER_GENERAL_SCHEMA,
  TMemberGeneralSchema,
} from "./member-details-general.type";
import css from "./member-details-general.module.css";


export default function MemberDetailsGeneral({ member }: IMemberDetailsGeneralProps): JSX.Element {
  const form = useForm<TMemberGeneralSchema>({
    mode: "onSubmit",
    resolver: zodResolver(MEMBER_GENERAL_SCHEMA),
    defaultValues: {
      ...MEMBER_GENERAL_DEFAULT,
      firstName: member.firstName || "",
      lastName: member.lastName || "",
      email: member.email || "",
      role: member.role,
      is_active: member.is_active,
    },
  });

  async function submit(data: TMemberGeneralSchema): Promise<void> {
    try {

      await update_member(member.id, data);
      toast.success("Member bijgewerkt.");
      form.reset(data);

    } catch (error) {

      console.error("[MEMBER DETAILS GENERAL] Cannot submit form.", error);
      toast.error("Member kon niet worden bijgewerkt.");

    }
  }

  useEffect(() => {
    form.reset({
      ...MEMBER_GENERAL_DEFAULT,
      firstName: member.firstName || "",
      lastName: member.lastName || "",
      email: member.email || "",
      role: member.role,
      is_active: member.is_active,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  return (
    <Form methods={form} onSubmit={form.handleSubmit(submit)} className={css.container}>
      <Typography variant="subtitle2">Bewerk member</Typography>

      <div className={css.fields}>
        <Field.Text name="firstName" label="Voornaam" />
        <Field.Text name="lastName" label="Achternaam" />
        <Field.Text name="email" label="E-mail" type="email" />

        <Field.Select name="role" label="Rol">
          {MEMBER_ROLES.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </Field.Select>

        <Field.Switch name="is_active" label="Actief" />
      </div>

      <div className={css.buttons}>
        <Button
          type="submit"
          variant={form.formState.isDirty ? "contained" : "outlined"}
          color="primary"
          loading={form.formState.isSubmitting}
        >
          Opslaan
        </Button>
      </div>
    </Form>
  );
}
