import { IUser } from "@/types/database";
import z from "zod";

export interface IProfileGeneralProps {
  user: IUser;
}

export const PROFILE_GENERAL_SCHEMA = z.object({
  path_avatar: z.union([ z.instanceof(File).optional(), z.string().optional(), z.null().optional() ]),
  firstName: z.string().min(1, "profile.general.errors.firstNameRequired"),
  lastName: z.string(),
})

export type IProfileGeneralSchema = z.infer<typeof PROFILE_GENERAL_SCHEMA>;

export const PROFILE_GENERAL_DEFAULT: IProfileGeneralSchema = {
  path_avatar: null,
  firstName: "",
  lastName: "",
}