import { z } from "zod";

const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name required!" })
    .max(255, { message: "First Name can't be more than 255 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last Name required!" })
    .max(255, { message: "Last Name can't be more than 255 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email address!" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required!" })
    .min(10, { message: "Please enter a valid phone number" })
    .max(20, {
      message: "Phone number can't be more than 20 characters!",
    }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Address is required!" })
    .max(255, {
      message: "Address can't be more than 255 characters!",
    }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Query is required!" })
    .max(1024, { message: "Query can't be more than 1024 characters!" }),
});

export default contactSchema;
