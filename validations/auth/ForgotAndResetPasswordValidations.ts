import z from "zod";

export const ForgotPasswordValidation = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordValidationSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email({ message: "Invalid email format" }),
    token: z.string().min(1, "Token is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(64, "Password cannot exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordValidationSchema = z.infer<
  typeof resetPasswordValidationSchema
>;
export type ForgotPasswordValidation = z.infer<typeof ForgotPasswordValidation>;
