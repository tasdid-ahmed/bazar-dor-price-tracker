import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProductList from "@/components/category/category-product-list";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return { title: category ? category.nameBn : "বিভাগ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:py-9">
      <header className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-paper p-5 sm:p-6">
        <span
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-background text-3xl"
          aria-hidden="true"
        >
          {category.icon}
        </span>

        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold text-gray-900">
            {category.nameBn}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      <CategoryProductList products={products} />
    </div>
  );
}
