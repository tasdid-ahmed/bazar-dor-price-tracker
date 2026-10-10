
import ProductCard from "@/components/products/product-card";
import type { Product } from "@/lib/types";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
  tone?: "rise" | "fall" | "neutral";
}

export default function ProductSection({
  title,
  subtitle,
  products,
  id,
  tone = "neutral",
}: ProductSectionProps) {
  const titleColor = {
    rise: "text-rise",
    fall: "text-fall",
    neutral: "text-gray-900",
  };

  return (
    <section
      id={id}
      className="scroll-mt-6"
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id={id ? `${id}-heading` : undefined}
            className={`text-lg font-extrabold sm:text-xl ${titleColor[tone]}`}
          >
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>

        <p className="text-xs text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
