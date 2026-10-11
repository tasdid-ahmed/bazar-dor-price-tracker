
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "ইমেইল দিতে হবে।")
  .email("সঠিক ইমেইল ঠিকানা লিখুন।")
  .max(254, "ইমেইল ঠিকানাটি অনেক বড়।");

export const passwordSchema = z
  .string()
  .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।")
  .max(128, "পাসওয়ার্ড সর্বোচ্চ ১২৮ অক্ষরের হতে পারবে।");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "পাসওয়ার্ড দিতে হবে।"),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে।")
    .max(80, "নাম সর্বোচ্চ ৮০ অক্ষরের হতে পারবে।"),
  email: emailSchema,
  password: passwordSchema,
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে।")
    .max(80, "নাম সর্বোচ্চ ৮০ অক্ষরের হতে পারবে।"),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
