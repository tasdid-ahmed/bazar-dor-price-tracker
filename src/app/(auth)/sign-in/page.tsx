
import Link from "next/link";
import { Suspense } from "react";
import SignInForm from "@/components/auth/sign-in-form";

export const metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-4 py-10">
      <div className="w-full rounded-3xl border border-gray-200 bg-[#fafcf9] p-5 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-green-50 text-2xl">
            🛒
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">সাইন ইন</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <Suspense fallback={<p className="py-8 text-center text-sm text-gray-500">লোড হচ্ছে…</p>}>
          <SignInForm />
        </Suspense>

        <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
