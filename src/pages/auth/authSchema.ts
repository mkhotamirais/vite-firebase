import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, { message: "Password cannot exceed 32 characters" }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(32, { message: "Password cannot exceed 32 characters" }),
    confPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters long" })
      .max(32, { message: "Confirm password cannot exceed 32 characters" }),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Passwords don't match",
    path: ["confPassword"],
  });
