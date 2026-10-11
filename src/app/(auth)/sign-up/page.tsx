
import Link from "next/link";
import SignUpForm from "@/components/auth/sign-up-form";

export const metadata = { title: "অ্যাকাউন্ট তৈরি করুন" };

export default function SignUpPage() {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-4 py-10">
      <div className="w-full rounded-3xl border border-gray-200 bg-[#fafcf9] p-5 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-green-50 text-2xl">
            🛒
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <SignUpForm />

        <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-brand">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
