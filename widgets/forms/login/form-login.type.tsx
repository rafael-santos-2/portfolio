import { z as zod } from 'zod';


export interface IFormLoginProps {
  onClose?: (success: boolean) => void;
  redirect_path?: string;
}

export const SIGN_IN_SCHEMA = zod.object({
  email: zod.email({ message: "auth.signIn.errors.noValidEmail" }),
  password: zod.string().min(1, { message: "auth.signIn.errors.required" }).min(8, { message: "auth.sigIn.errors.passwordTooShort" }),
});
export type TSignInSchemaType = zod.infer<typeof SIGN_IN_SCHEMA>;



export const DEFAULT_SIGN_IN_VALUES: TSignInSchemaType = {
  email: "",
  password: "",
};