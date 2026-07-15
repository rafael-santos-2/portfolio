import { IUser  , TUserRole} from '@/types';
import z from "zod";


export interface IFormUser {

  user?: IUser;
  onClose: (user?: IUser) => void;

}

export const SCHEMA_USER = z.object({
  role: z.custom<TUserRole>(),
  firstName: z.string().min(1, "team.create.errors.firstNameRequired"),
  lastName: z.string(),
  email: z.string().min(1, "team.create.errors.emailRequired").email("team.create.errors.invalidEmail"),
  path_avatar: z.union([ z.instanceof(File).optional(), z.string().optional(), z.null().optional() ]),
  password: z.string()
    .min(8, "team.create.errors.passwordTooShort")
    .regex(/[a-z]/, "team.create.errors.noSmallerLetter")
    .regex(/[A-Z]/, "team.create.errors.noUppercaseLetter")
    .regex(/[0-9]/, "team.create.errors.noNumber")
    .regex(/[^A-Za-z0-9]/, "team.create.errors.noSpecialCharacter"),
});


export type TFormUserValues = z.infer<typeof SCHEMA_USER>;



export const DEFAULT_FORM_USER: TFormUserValues = {
  role: "Admin",
  firstName: "",
  lastName: "",
  email: "",
  path_avatar: null,
  password: "",
};
