import { allowedPlatforms } from "@/constants/statics";
import z from "zod";

export const singleLinkValidationSchema = z.object({
  platform: z.enum(allowedPlatforms, {
    message: "Please select a valid platform",
  }),
  url: z
    .string()
    .trim()
    .url({ message: "Please provide a valid URL" })
    .min(1, { message: "URL cannot be empty" })
    .max(500, { message: "URL cannot exceed 500 characters" }),
});

export const contactValidationSchema = z.object({
  socialLinks: z
    .array(singleLinkValidationSchema)
    .min(1, { message: "At least one social link is required" })
    .max(16, { message: "Maximum 16 social links allowed" })
    .refine(
      (links) => {
        const platforms = links.map((link) => link.platform);
        return platforms.length === new Set(platforms).size;
      },
      {
        message: "Duplicate platforms are not allowed",
      },
    ),
});

export type ContactValidationSchema = z.infer<typeof contactValidationSchema>;
