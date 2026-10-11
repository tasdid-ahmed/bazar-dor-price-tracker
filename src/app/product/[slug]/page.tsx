
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
    getCategoryBySlug,
    getProductBySlug,
} from "@/lib/api";
import {
    formatAverage,
    formatPrice,
    getMarketAverage,
    getPriceSummary,
    unitLabel,
} from "@/lib/format";
import { auth } from "@/lib/auth";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
    params,
}: ProductPageProps) {
    const { slug } = await params;

    // Verify the session on the server before showing product data.
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        const next = `/product/${encodeURIComponent(slug)}`;
        redirect(
            `/sign-in?reason=login-required&next=${encodeURIComponent(next)}`,
        );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const category = await getCategoryBySlug(product.category);
    const summary = getPriceSummary(product);

    const markets = [...product.markets].sort(
        (a, b) => getMarketAverage(a) - getMarketAverage(b),
    );

    return (
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
            <nav
                aria-label="ব্রেডক্রাম্ব"
                className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
            >
                <Link href="/" className="transition hover:text-brand">
                    হোম
                </Link>
                <span aria-hidden="true">/</span>
                {category ? (
                    <Link
                        href={`/category/${category.slug}`}
                        className="transition hover:text-brand"
                    >
                        {category.icon} {category.nameBn}
                    </Link>
                ) : (
                    <span>{product.categoryNameBn}</span>
                )}
                <span aria-hidden="true">/</span>
                <span className="font-medium text-gray-800">{product.nameBn}</span>
            </nav>

            <section className="grid gap-6 rounded-3xl border border-gray-200/80 bg-[#fafcf9] p-5 shadow-sm sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-8 sm:p-8">
                <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-2xl bg-[#f0f5ef] p-4 sm:min-h-56">
                    {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <span
                            role="img"
                            aria-label={product.nameBn}
                            className="text-6xl sm:text-7xl"
                        >
                            {product.image}
                        </span>
                    ) : (
                        <span className="text-6xl" aria-hidden="true">
                            {product.categoryIcon}
                        </span>
                    )}
                </div>

                <div className="flex min-w-0 flex-col justify-center">
                    <p className="text-sm font-semibold text-brand">
                        {product.categoryIcon} {product.categoryNameBn}
                    </p>

                    <h1 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        {product.nameBn}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {unitLabel(product.unit)} অনুযায়ী মূল্য
                    </p>

                    <p className="mt-5 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        {formatPrice(product.today)}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        গতকালের দাম: {formatPrice(product.yesterday)}
                    </p>
                </div>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="rounded-2xl border border-green-200 bg-[#fafcf9] p-5">
                    <p className="text-sm font-medium text-gray-500">
                        সর্বনিম্ন বাজারদর
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-fall">
                        {formatPrice(summary.min)}
                    </p>
                </article>

                <article className="rounded-2xl border border-gray-200 bg-[#fafcf9] p-5">
                    <p className="text-sm font-medium text-gray-500">
                        গড় বাজারদর
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-gray-900">
                        {formatPrice(summary.average)}
                    </p>
                </article>

                <article className="rounded-2xl border border-red-200 bg-[#fafcf9] p-5">
                    <p className="text-sm font-medium text-gray-500">
                        সর্বোচ্চ বাজারদর
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-rise">
                        {formatPrice(summary.max)}
                    </p>
                </article>
            </section>

            <section className="mt-10">
                <div className="mb-5">
                    <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                        বাজারভিত্তিক মূল্য তুলনা
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        গড় দাম অনুযায়ী কম থেকে বেশি ক্রমে সাজানো
                    </p>
                </div>

                {markets.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-[#fafcf9] p-8 text-center text-gray-500">
                        এই পণ্যের জন্য বর্তমানে কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#fafcf9]">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] text-left text-sm">
                                <thead className="bg-[#f0f5ef] text-gray-600">
                                    <tr>
                                        <th scope="col" className="px-5 py-4 font-semibold">
                                            বাজার
                                        </th>
                                        <th scope="col" className="px-5 py-4 font-semibold">
                                            বিভাগ
                                        </th>
                                        <th scope="col" className="px-5 py-4 font-semibold">
                                            সর্বনিম্ন
                                        </th>
                                        <th scope="col" className="px-5 py-4 font-semibold">
                                            সর্বোচ্চ
                                        </th>
                                        <th scope="col" className="px-5 py-4 font-semibold">
                                            গড় দাম
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {markets.map((market, index) => (
                                        <tr
                                            key={`${market.market}-${market.division}`}
                                            className="transition hover:bg-green-50/60"
                                        >
                                            <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                                                {index === 0 && (
                                                    <span
                                                        className="mr-2 inline-block size-2 rounded-full bg-fall"
                                                        aria-label="সর্বনিম্ন গড় দাম"
                                                        title="সর্বনিম্ন গড় দাম"
                                                    />
                                                )}
                                                {market.market}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                                                {market.division}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                                                {formatPrice(market.min)}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                                                {formatPrice(market.max)}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-4 font-bold text-gray-900">
                                                {formatAverage(getMarketAverage(market))} টাকা
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </section>

            <p className="mt-5 text-xs leading-6 text-gray-500">
                বাজারভেদে দাম পরিবর্তিত হতে পারে। কেনাকাটার আগে সংশ্লিষ্ট বাজারের
                সর্বশেষ মূল্য যাচাই করুন।
            </p>
        </main>
    );
}
