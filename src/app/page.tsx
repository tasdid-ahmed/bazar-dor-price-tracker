
import { getProducts } from "@/lib/api";
import { toBn, formatPrice, unitShort } from "@/lib/format";

export default async function Home() {
  let products;

  try {
    products = await getProducts();
  } catch {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-red-700">
          API connection failed
        </h1>
        <p className="mt-2">
          Check the API availability and your terminal for errors.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold text-brand">বাজার দর — API পরীক্ষা</h1>

      <p className="mt-2 text-gray-600">
        মোট {toBn(products.length)}টি পণ্য পাওয়া গেছে।
      </p>

      <ul className="mt-6 divide-y divide-gray-200 rounded-xl border border-gray-200">
        {products.map((product) => (
          <li key={product.id} className="flex items-center gap-3 p-4">
            <span className="text-2xl" aria-hidden="true">
              {product.image}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-semibold">{product.nameBn}</p>
              <p className="text-sm text-gray-500">
                {unitShort(product.unit)}
              </p>
            </div>

            <p className="shrink-0 font-bold">
              {formatPrice(product.today)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
