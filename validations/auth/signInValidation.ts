import z from "zod";

export const signInValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInValidationSchema = z.infer<typeof signInValidationSchema>;
