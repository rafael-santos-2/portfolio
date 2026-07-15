import { IUser } from "@/types/database";
import z from "zod";

export interface ITeamDetailsGeneralProps {
  user: IUser;
}

export const TEAM_GENERAL_SCHEMA = z.object({
  path_avatar: z.union([ z.instanceof(File).optional(), z.string().optional(), z.null().optional() ]),
  firstName: z.string().min(1, "team.general.errors.firstNameRequired"),
  lastName: z.string(),
})

export type ITeamGeneralSchema = z.infer<typeof TEAM_GENERAL_SCHEMA>;

export const TEAM_GENERAL_DEFAULT: ITeamGeneralSchema = {
  path_avatar: null,
  firstName: "",
  lastName: "",
}