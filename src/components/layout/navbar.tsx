
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BanglaDate from "@/components/layout/bangla-date";
import { authClient } from "@/lib/auth-client";
import type { Category } from "@/lib/types";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  const user = session?.user;
  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="relative z-20 border-b border-gray-200/80 bg-[#fafcf9]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand">
            <span className="text-xl" aria-hidden="true">🛒</span>
          </span>

          <span className="min-w-0">
            <span className="block text-lg font-extrabold leading-tight text-gray-900">
              বাজার দর
            </span>
            <BanglaDate />
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 text-sm">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" aria-label="অ্যাকাউন্ট লোড হচ্ছে" />
          ) : user ? (
            <div className="relative">

              <button
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex max-w-[190px] items-center gap-2 rounded-xl px-2.5 py-2 transition hover:bg-green-50"
              >
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt=""
                    className="size-9 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-brand">
                    {initials}
                  </span>
                )}

                <span className="truncate text-sm font-semibold leading-none text-gray-800">
                  {user.name?.trim().split(/\s+/)[0] || "অ্যাকাউন্ট"}
                </span>

                <span
                  aria-hidden="true"
                  className="ml-0.5 size-0 shrink-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-gray-500"
                />
              </button>


              {menuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="মেনু বন্ধ করুন"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-20 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl"
                  >
                    <div className="border-b border-gray-100 px-3 pb-3">
                      <p className="break-words text-sm font-bold text-gray-900">
                        {user.name}
                      </p>
                      <p className="mt-1 break-all text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      role="menuitem"
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="mt-2 block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-brand"
                    >
                      আমার প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      disabled={signingOut}
                      onClick={() => void handleSignOut()}
                      className="mt-1 w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      {signingOut ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-2.5 py-2 font-medium text-gray-700 transition hover:text-brand"
              >
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-brand px-3 py-2 font-semibold text-white transition hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav
        aria-label="পণ্যের বিভাগ"
        className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3"
      >
        <ul className="flex w-max min-w-full items-center gap-2">
          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = pathname === href;

            return (
              <li key={category.id}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${active
                      ? "bg-brand text-white"
                      : "text-gray-600 hover:bg-green-50 hover:text-brand"
                    }`}
                >
                  <span aria-hidden="true">{category.icon}</span>
                  {category.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
