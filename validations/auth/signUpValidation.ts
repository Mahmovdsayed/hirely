import z from "zod";

export const signUpValidationSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
  role: z
    .enum(["freelancer", "client", "company"])
    .optional()
    .default("freelancer"),
  userName: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  firstName: z
    .string()
    .trim()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(20, { message: "First name must be at most 20 characters" })
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(20, { message: "Last name must be at most 20 characters" })
    .optional(),
  companyName: z
    .string()
    .trim()
    .min(3, { message: "Company name must be at least 3 characters" })
    .max(20, { message: "Company name must be at most 20 characters" })
    .optional(),
});

export type SignUpValidationSchema = z.infer<typeof signUpValidationSchema>;
