import { z } from "zod";

export const loginSchema = z.object({
  contact: z.string().min(11, "Contact number must be at least 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    contact: z.string().min(10, "Contact number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const formSchema = z.object({
  categoryName: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters"),
  description: z.string().optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug cannot exceed 100 characters"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file !== null, "Image is required"),
});
