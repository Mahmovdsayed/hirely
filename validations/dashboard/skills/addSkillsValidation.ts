import z from "zod";

export const addSkillsValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Skill name must be at least 2 characters" })
    .max(100, { message: "Skill name must be at most 100 characters" }),
  category: z
    .string()
    .trim()
    .min(2, { message: "Skill category must be at least 2 characters" })
    .max(100, { message: "Skill category must be at most 100 characters" }),
});

export type AddSkillsValidationSchema = z.infer<
  typeof addSkillsValidationSchema
>;
