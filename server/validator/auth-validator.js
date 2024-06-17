//! ******** CREATE USER SCHEMA WITH ZOD VALIDATION ******** !//

import { z } from "zod";

const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Name is required!" })
    .max(255, { message: "Name can't be more than 255 characters!" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(1024, {
      message: "Password can't be more than 1024 characters!",
    }),
  category: z.string().trim().min(1, { message: "Category is required!" }),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(1024, {
      message: "Password can't be more than 1024 characters!",
    }),
});

export { signUpSchema, loginSchema };
