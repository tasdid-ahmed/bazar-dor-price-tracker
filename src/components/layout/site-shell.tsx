
import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import PriceTicker from "@/components/layout/price-ticker";
import Footer from "@/components/layout/footer";

export default async function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoriesResult, productsResult] = await Promise.allSettled([
    getCategories(),
    getProducts(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled"
      ? categoriesResult.value
      : [];

  const products =
    productsResult.status === "fulfilled"
      ? productsResult.value
      : [];

  return (
    <>
      <Navbar categories={categories} />
      <PriceTicker products={products} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
