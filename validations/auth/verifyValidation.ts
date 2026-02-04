import z from "zod";

export const verifyEmailValidationSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const resendOtpCodeValidationSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
});

export type VerifyEmailValidationSchema = z.infer<
  typeof verifyEmailValidationSchema
>;
export type ResendOtpCodeValidationSchema = z.infer<
  typeof resendOtpCodeValidationSchema
>;
