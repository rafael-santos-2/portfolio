import { IUser } from "@/types/database";
import z from "zod";

export interface ITeamDetailsPasswordProps {
  user: IUser;
}

export const TEAM_PASSWORD_SCHEMA = z.object({
  newPassword: z.string()
    .min(8, { message: 'team.password.errors.passwordTooShort' })
    .regex(/[a-z]/, { message: 'team.password.errors.noSmallerLetter' })
    .regex(/[A-Z]/, { message: 'team.password.errors.noUppercaseLetter' })
    .regex(/[0-9]/, { message: 'team.password.errors.noNumber' })
    .regex(/[^A-Za-z0-9]/, { message: 'team.password.errors.noSpecialCharacter' }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "team.password.errors.noMatch",
  path: ["confirmNewPassword"],
})

export type TTeamPasswordSchema = z.infer<typeof TEAM_PASSWORD_SCHEMA>;

export const TEAM_PASSWORD_DEFAULT: TTeamPasswordSchema = {
  newPassword: "",
  confirmNewPassword: "",
}