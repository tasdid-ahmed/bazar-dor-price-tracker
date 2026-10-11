"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/products/product-card";
import { toBn } from "@/lib/format";
import type { Product } from "@/lib/types";

type SortOption = "default" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  default: "ডিফল্ট",
  "price-asc": "দাম: কম থেকে বেশি",
  "price-desc": "দাম: বেশি থেকে কম",
};

export default function CategoryProductList({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-paper px-6 py-14 text-center">
        <p className="text-5xl" aria-hidden="true">
          🧺
        </p>
        <h2 className="mt-4 text-xl font-extrabold text-gray-900">
          এই বিভাগে এখন কোনো পণ্য নেই
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          অন্য বিভাগ দেখুন অথবা হোম পেজে ফিরে যান।
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Sort on the raw numeric price (never on the Bengali-formatted text).
  const sortedProducts =
    sort === "default"
      ? products
      : [...products].sort((a, b) =>
          sort === "price-asc" ? a.today - b.today : b.today - a.today,
        );

  return (
    <>
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200/80 bg-paper px-5 py-4">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>

        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-green-100"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option]}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
