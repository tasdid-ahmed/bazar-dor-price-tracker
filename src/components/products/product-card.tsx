
import Link from "next/link";
import { formatPrice, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import ChangeBadge from "@/components/products/change-badge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex min-w-0 flex-col justify-between rounded-2xl border border-gray-200/80 bg-[#fafcf9] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md sm:p-4"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5ef] text-2xl sm:size-12"
          aria-hidden="true"
        >
          {product.image}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 group-hover:text-brand sm:text-base">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">
            {formatPrice(product.today)}
          </p>
        </div>

        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
