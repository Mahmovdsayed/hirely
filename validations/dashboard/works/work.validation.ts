import { employmentTypes } from "@/constants/statics";
import { imageValidationSchema } from "@/validations/uploadImage.validation";
import z from "zod";

export const workValidationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: "Company name cannot be empty" })
    .max(100, { message: "Company name cannot exceed 100 characters" }),
  position: z
    .string()
    .trim()
    .min(1, { message: "Position cannot be empty" })
    .max(100, { message: "Position cannot exceed 100 characters" }),
  startDate: z.coerce.date({ message: "Start date is required" }),
  endDate: z.coerce.date().optional().nullable(),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description cannot be empty" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  isCurrent: z.boolean().optional().default(false),
  employmentType: z.enum(employmentTypes).optional().default("Full-time"),
  location: z
    .string()
    .trim()
    .max(100, { message: "Location cannot exceed 100 characters" })
    .optional(),
  achievements: z
    .array(
      z
        .string()
        .max(100, { message: "Achievement cannot exceed 100 characters" }),
    )
    .optional(),
  responsibilities: z
    .array(
      z
        .string()
        .max(100, { message: "Responsibility cannot exceed 100 characters" }),
    )
    .optional(),
  skills: z
    .array(
      z.string().max(100, { message: "Skill cannot exceed 100 characters" }),
    )
    .optional(),
  companyImage: imageValidationSchema.optional(),
  aiCounter: z.coerce.number().optional().default(0),
});

export type WorkValidationSchema = z.infer<typeof workValidationSchema>;
