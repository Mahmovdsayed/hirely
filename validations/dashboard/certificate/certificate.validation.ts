import z from "zod";

export const certificateValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Certificate name cannot be empty" })
    .max(200, { message: "Certificate name cannot exceed 200 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description cannot be empty" })
    .max(1000, { message: "Description cannot exceed 1000 characters" }),
  issueDate: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : val),
    z.date({ message: "Issue date is required" }),
  ),
  issuer: z
    .string()
    .trim()
    .min(1, { message: "Issuer cannot be empty" })
    .max(150, { message: "Issuer cannot exceed 150 characters" }),
  certificateType: z.enum(
    ["course", "certification", "license", "achievement", "other"],
    {
      message: "Please select a valid certificate type",
    },
  ),
  courseName: z.string().trim().max(200).optional(),
  courseProvider: z.string().trim().max(150).optional(),
  instructor: z.string().trim().max(100).optional(),
  duration: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0).optional().nullable(),
  ),
  completionDate: z.preprocess(
    (val) => (typeof val === "string" && val ? new Date(val) : val),
    z.date().optional().nullable(),
  ),
  courseUrl: z
    .string()
    .trim()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  courseLevel: z
    .enum(["beginner", "intermediate", "advanced", "expert"])
    .optional()
    .nullable(),
  skills: z.array(z.string()).optional(),
  credentialId: z.string().trim().max(100).optional(),
  credentialUrl: z
    .string()
    .trim()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  completionStatus: z.enum(["completed", "in-progress", "expired"], {
    message: "Please select a valid completion status",
  }),
});

export type CertificateValidationSchema = z.infer<
  typeof certificateValidationSchema
>;
