
import { getProducts } from "@/lib/api";
import HeroBanner from "@/components/home/hero-banner";
import ProductSection from "@/components/home/product-section";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-9 px-4 py-6 sm:space-y-12 sm:py-9">
      <HeroBanner />

      <ProductSection
        title="▲ আজ দাম বেড়েছে"
        products={risers}
        tone="rise"
      />

      <ProductSection
        title="▼ আজ দাম কমেছে"
        products={fallers}
        tone="fall"
      />

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
}
