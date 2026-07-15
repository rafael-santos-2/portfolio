import { IUser } from "@/types/database";
import z from "zod";

export interface IProfileEmailProps {
  user: IUser;
}

export const PROFILE_EMAIL_SCHEMA = z.object({
  email: z.email("profile.email.errors.noValidEmail").min(1, "profile.email.errors.required"),
})

export type TProfileEmailSchema = z.infer<typeof PROFILE_EMAIL_SCHEMA>;

export const PROFILE_EMAIL_DEFAULT: TProfileEmailSchema = {
  email: "",
}