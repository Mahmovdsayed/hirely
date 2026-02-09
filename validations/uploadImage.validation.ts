import { allowedExtensions } from "@/constants/statics";
import z from "zod";

export const imageValidationSchema = z
  .any()
  .refine(
    (file) => {
      if (!file) return true;
      const fileName = file?.name || "";
      const extension = fileName.split(".").pop()?.toLowerCase();
      return (
        file instanceof File &&
        extension &&
        allowedExtensions.image.includes(extension)
      );
    },
    {
      message: `Only image files (${allowedExtensions.image.join(
        ", ",
      )}) are allowed`,
    },
  )
  .refine(
    (file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024;
    },
    {
      message: "Image size should be less than 5MB",
    },
  )
  .optional();

export type ImageValidationSchema = z.infer<typeof imageValidationSchema>;
