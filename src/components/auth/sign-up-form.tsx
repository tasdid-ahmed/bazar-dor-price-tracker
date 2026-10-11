
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/validation";
import SocialAuthButtons from "@/components/auth/social-auth-buttons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };

    const validation = signUpSchema.safeParse(values);

    if (!validation.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = String(issue.path[0] ?? "form");
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("তথ্যগুলো যাচাই করে আবার চেষ্টা করুন।");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      });

      if (result.error) {
        const message = (result.error.message ?? "").toLowerCase();
        if (
          message.includes("already") ||
          message.includes("exist") ||
          message.includes("taken")
        ) {
          toast.error("এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে। সাইন ইন করুন।");
        } else {
          toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। তথ্যগুলো যাচাই করে আবার চেষ্টা করুন।");
        }
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-700">
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="যেমন: রহিম উদ্দিন"
          maxLength={80}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="signup-email" className="mb-1.5 block text-sm font-semibold text-gray-700">
          ইমেইল
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "signup-email-error" : undefined}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />
        {errors.email && <p id="signup-email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="signup-password" className="mb-1.5 block text-sm font-semibold text-gray-700">
          পাসওয়ার্ড
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          minLength={8}
          maxLength={128}
          required
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "signup-password-error" : undefined}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />
        {errors.password && <p id="signup-password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-gray-700">
          পাসওয়ার্ড নিশ্চিত করুন
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="আবার লিখুন"
          minLength={8}
          maxLength={128}
          required
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />
        {errors.confirmPassword && <p id="confirm-password-error" className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "অ্যাকাউন্ট তৈরি করুন"}
      </button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">অথবা</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialAuthButtons />

      <p className="text-center text-sm text-gray-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/sign-in" className="font-bold text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
