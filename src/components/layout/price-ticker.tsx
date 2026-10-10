
"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { formatPct, formatPrice, unitShort } from "@/lib/format";
import type { Product } from "@/lib/types";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="border-b border-gray-200 bg-white py-2">
      <Marquee
        pauseOnHover
        play={!reducedMotion}
        speed={70}
        gradient={false}
        autoFill
      >
        {products.map((product) => {
          const direction = product.change.dir;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="mx-4 flex shrink-0 items-center gap-2 text-xs sm:text-sm"
            >
              <span aria-hidden="true">{product.image}</span>
              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>
              <span className="text-gray-600">
                {formatPrice(product.today)}/{unitShort(product.unit)}
              </span>
              <span
                className={
                  direction === "up"
                    ? "font-semibold text-rise"
                    : direction === "down"
                      ? "font-semibold text-fall"
                      : "font-medium text-gray-500"
                }
              >
                {direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "—"}{" "}
                {formatPct(product.change.pct)}
              </span>
              <span className="ml-2 text-gray-300" aria-hidden="true">
                |
              </span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}
