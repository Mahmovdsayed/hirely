import z from "zod";
import { imageValidationSchema } from "../uploadImage.validation";

export const editProfileValidationSchema = z.object({
  birthday: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      return !isNaN(new Date(date).getTime());
    }, "Invalid date format"),
  phone: z.string().optional(),
  about: z.string().optional(),
  nationality: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  positionName: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 3 characters" })
    .max(20, { message: "First name must be at most 20 characters" }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 3 characters" })
    .max(20, { message: "Last name must be at most 20 characters" }),
});

export const editProfileImageValidationSchema = z.object({
  avatar: imageValidationSchema,
});

export type EditProfileRequest = z.infer<typeof editProfileValidationSchema>;
export type EditProfileImageRequest = z.infer<
  typeof editProfileImageValidationSchema
>;
