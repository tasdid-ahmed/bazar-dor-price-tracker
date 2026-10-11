"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/validation";
import SocialAuthButtons from "@/components/auth/social-auth-buttons";

function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }

  try {
    const url = new URL(value, window.location.origin);
    if (url.origin !== window.location.origin) return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

const SOCIAL_ERRORS: Record<string, string> = {
  account_not_linked:
    "এই ইমেইল দিয়ে ইতিমধ্যে ইমেইল-পাসওয়ার্ডে অ্যাকাউন্ট খোলা আছে। সেই পদ্ধতিতেই সাইন ইন করুন।",
  unable_to_link_account:
    "অ্যাকাউন্টটি যুক্ত করা যায়নি। পুরোনো ডেটা থাকলে মুছে আবার চেষ্টা করুন।",
  email_not_found: "আপনার অ্যাকাউন্ট থেকে ইমেইল পাওয়া যায়নি।",
};

export default function SignInForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (searchParams.get("reason") === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: "login-required" });
    }

    const error = searchParams.get("error");
    if (error) {
      toast.error(
        SOCIAL_ERRORS[error] ?? "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।",
        { id: "social-error" },
      );
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const formData = new FormData(event.currentTarget);
    const values = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const validation = signInSchema.safeParse(values);

    if (!validation.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = String(issue.path[0] ?? "form");
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      toast.error("সঠিক ইমেইল ও পাসওয়ার্ড দিন।");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: validation.data.email,
        password: validation.data.password,
      });

      if (result.error) {
        toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      const destination = safeNextPath(searchParams.get("next"));
      window.location.replace(destination);
    } catch {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="signin-email" className="mb-1.5 block text-sm font-semibold text-gray-700">
          ইমেইল
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "signin-email-error" : undefined}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />
        {errors.email && <p id="signin-email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="signin-password" className="mb-1.5 block text-sm font-semibold text-gray-700">
          পাসওয়ার্ড
        </label>
        <input
          id="signin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="আপনার পাসওয়ার্ড"
          maxLength={128}
          required
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "signin-password-error" : undefined}
          className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />
        {errors.password && <p id="signin-password-error" className="mt-1 text-xs text-red-600">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
      </button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">অথবা</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialAuthButtons />

      <p className="text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/sign-up" className="font-bold text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}