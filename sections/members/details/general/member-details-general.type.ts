import { IMember, TMemberRole } from "@/types/database";
import z from "zod";

export interface IMemberDetailsGeneralProps {
  member: IMember;
}

export const MEMBER_GENERAL_SCHEMA = z.object({
  firstName: z.string().trim().min(1, "Voornaam is verplicht"),
  lastName: z.string().trim().min(1, "Achternaam is verplicht"),
  email: z.string().trim().min(1, "E-mail is verplicht").email("Ongeldig e-mailadres"),
  role: z.custom<TMemberRole>(),
  is_active: z.boolean(),
});

export type TMemberGeneralSchema = z.infer<typeof MEMBER_GENERAL_SCHEMA>;

export const MEMBER_GENERAL_DEFAULT: TMemberGeneralSchema = {
  firstName: "",
  lastName: "",
  email: "",
  role: "Viewer",
  is_active: true,
};
