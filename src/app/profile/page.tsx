import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/profile/sign-out-button";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  // Real session check on the server (the proxy only checks the cookie).
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in?reason=login-required&next=%2Fprofile");
  }

  const { user } = session;

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <section className="flex flex-col gap-5 rounded-2xl border border-gray-200/80 bg-paper p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt=""
              className="size-16 shrink-0 rounded-2xl object-cover"
            />
          ) : (
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-brand">
              {initials}
            </span>
          )}

          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/profile/update"
            className="inline-flex items-center rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800"
          >
            তথ্য আপডেট করুন
          </Link>
          <SignOutButton />
        </div>
      </section>
    </div>
  );
}
