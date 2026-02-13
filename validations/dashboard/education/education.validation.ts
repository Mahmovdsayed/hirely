import { degreeTypes } from "@/constants/statics";
import * as z from "zod";

export const educationValidationSchema = z
  .object({
    institution: z.string().min(1, "Institution name is required").max(150),
    degree: z.enum(degreeTypes, {
      message: "Please select a valid degree",
    }),
    fieldOfStudy: z.string().min(1, "Field of study is required").max(100),
    startDate: z.preprocess(
      (val) => (typeof val === "string" && val ? new Date(val) : val),
      z.date({
        message: "Start date is required",
      }),
    ),
    endDate: z.preprocess(
      (val) => (typeof val === "string" && val ? new Date(val) : val),
      z.date().nullable().optional(),
    ),
    isCurrent: z.boolean().default(false),
    grade: z.string().max(50).optional(),
    gpa: z.preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().min(0).max(5.0).optional()),
    location: z.string().max(100).optional(),
    description: z.string().max(1000).optional(),
    activities: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
    coursework: z.array(z.string()).optional(),
    institutionImage: z.any().optional(),
    aiCounter: z.preprocess((val) => Number(val ?? 0), z.number().default(0)),
  })
  .refine(
    (data) => {
      if (!data.isCurrent && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required if not currently studying",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      if (data.endDate && data.startDate && data.endDate < data.startDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    },
  );

export type EducationValidationSchema = z.infer<
  typeof educationValidationSchema
>;
