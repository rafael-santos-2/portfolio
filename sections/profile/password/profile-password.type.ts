import z from "zod";

export const PROFILE_PASSWORD_SCHEMA = z.object({
  password: z.string().min(1, { message: "profile.password.errors.required" }),
  newPassword: z.string()
    .min(6, { message: 'profile.password.errors.passwordTooShort' })
    .regex(/[a-z]/, { message: 'profile.password.errors.noSmallerLetter' })
    .regex(/[A-Z]/, { message: 'profile.password.errors.noUppercaseLetter' })
    .regex(/[0-9]/, { message: 'profile.password.errors.noNumber' })
    .regex(/[^A-Za-z0-9]/, { message: 'profile.password.errors.noSpecialCharacter' }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "profile.password.errors.noMatch",
  path: ["confirmNewPassword"],
})

export type TProfilePasswordSchema = z.infer<typeof PROFILE_PASSWORD_SCHEMA>;

export const PROFILE_PASSWORD_DEFAULT: TProfilePasswordSchema = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
}