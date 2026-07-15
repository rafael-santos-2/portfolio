import { IUser } from "@/types/database";
import z from "zod";

export interface ITeamEmailProps {
  user: IUser;
}

export const TEAM_EMAIL_SCHEMA = z.object({
  email: z.email("team.email.errors.noValidEmail").min(1, "team.email.errors.required"),
})

export type TTeamEmailSchema = z.infer<typeof TEAM_EMAIL_SCHEMA>;

export const TEAM_EMAIL_DEFAULT: TTeamEmailSchema = {
  email: "",
}