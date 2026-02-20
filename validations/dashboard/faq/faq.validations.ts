import z from "zod";

export const addFaqValidationSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long" })
    .max(500, { message: "Question must be at most 500 characters long" }),
  answer: z
    .string()
    .min(5, { message: "Answer must be at least 5 characters long" })
    .max(2000, { message: "Answer must be at most 2000 characters long" }),
});

export type AddFaqValidationSchema = z.infer<typeof addFaqValidationSchema>;
