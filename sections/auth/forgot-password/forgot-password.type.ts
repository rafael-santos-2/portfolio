import { z as zod } from 'zod';

export const FORGOT_PASSWORD_SCHEMA = zod.object({
    email: zod.email({ message: "auth.forgotPassword.errors.noValidEmail" }),
});

export type TForgotPasswordSchemaType = zod.infer<typeof FORGOT_PASSWORD_SCHEMA>;

export const DEFAULT_FORGOT_PASSWORD_VALUES: TForgotPasswordSchemaType = {
  email: "",
};