"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="size-4 shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.63 5.92c4.45-4.1 7.14-10.14 7.14-17.57Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.88l-7.63-5.92c-2.12 1.42-4.84 2.3-8.28 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.08 5.49.4.34.75 1.02.75 2.06v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
      />
    </svg>
  );
}

export default function SocialAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  async function handleSocialSignIn(provider: "google" | "github") {
    setLoadingProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });

      if (result.error) {
        toast.error("সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।");
        setLoadingProvider(null);
      }
    } catch {
      toast.error("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoadingProvider(null);
    }
  }

  const buttonClass =
  "flex min-h-12 w-full min-w-0 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-3 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60";


  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        disabled={loadingProvider !== null}
        onClick={() => void handleSocialSignIn("google")}
        className={buttonClass}
      >
        <GoogleIcon />
        <span className="whitespace-nowrap">
          {loadingProvider === "google"
            ? "সংযোগ হচ্ছে…"
            : "Google দিয়ে চালিয়ে যান"}
        </span>
      </button>

      <button
        type="button"
        disabled={loadingProvider !== null}
        onClick={() => void handleSocialSignIn("github")}
        className={buttonClass}
      >
        <GitHubIcon />
        <span className="whitespace-nowrap">
          {loadingProvider === "github"
            ? "সংযোগ হচ্ছে…"
            : "GitHub দিয়ে চালিয়ে যান"}
        </span>
      </button>
    </div>
  );
}