import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(1, { error: "Password required" }),
});

export const registerSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, { error: "Password must be at least 6 characters" }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
