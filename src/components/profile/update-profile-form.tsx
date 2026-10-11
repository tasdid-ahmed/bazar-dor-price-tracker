"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { updateProfileSchema } from "@/lib/validation";

export default function UpdateProfileForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    const formData = new FormData(event.currentTarget);

    const validation = updateProfileSchema.safeParse({
      name: String(formData.get("name") ?? ""),
    });

    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "নামটি সঠিক নয়।");
      toast.error("নামটি যাচাই করে আবার চেষ্টা করুন।");
      return;
    }

    setError("");

    if (validation.data.name === initialName) {
      toast("কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: validation.data.name,
      });

      if (result.error) {
        toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
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
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          নাম
        </label>

        <input
          id="profile-name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue={initialName}
          maxLength={80}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "profile-name-error" : undefined}
          onChange={() => {
            if (error) setError("");
          }}
          className="w-full rounded-lg border border-gray-200 bg-transparent px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-green-100"
        />

        {error && (
          <p
            id="profile-name-error"
            role="alert"
            className="mt-2 text-xs text-red-600"
          >
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে…" : "আপডেট"}
      </button>
    </form>
  );
}
