import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/profile/sign-out-button";
import UpdateProfileForm from "@/components/profile/update-profile-form";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  // Verify the user's session on the server.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?reason=login-required&next=%2Fprofile");
  }

  const { user } = session;

  console.log("Profile image URL:", user.image);

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-8 sm:pt-10">
      <div className="space-y-6">
        {/* Page heading */}
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Profile summary */}
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
              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <SignOutButton />
          </div>
        </section>

        {/* Update profile form */}
        <section className="rounded-2xl border border-gray-200/80 bg-paper p-5 sm:p-6">
          <h2 className="mb-5 text-base font-bold text-gray-900">
            তথ্য
          </h2>

          <UpdateProfileForm initialName={user.name ?? ""} />
        </section>
      </div>
    </main>
  );
}
