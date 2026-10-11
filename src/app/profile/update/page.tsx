import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/profile/update-profile-form";
import { auth } from "@/lib/auth";

export const metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in?reason=login-required&next=%2Fprofile%2Fupdate");
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার নাম পরিবর্তন করে আপডেট করুন।
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200/80 bg-paper p-5 sm:p-6">
        <h2 className="mb-4 text-base font-bold text-gray-900">তথ্য</h2>
        <UpdateProfileForm initialName={session.user.name ?? ""} />
      </section>

      <Link
        href="/profile"
        className="block text-sm text-gray-500 transition hover:text-brand"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
