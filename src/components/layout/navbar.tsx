
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BanglaDate from "@/components/layout/bangla-date";
import type { Category } from "@/lib/types";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200/80 bg-[#fafcf9]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
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
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition ${
                    active
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
