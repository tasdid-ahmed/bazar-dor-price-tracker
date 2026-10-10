
import Image from "next/image";
import Link from "next/link";
import { banglaDate } from "@/lib/format";

export default function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-3xl border border-green-100 bg-[#fafcf9]">
      <div className="grid items-center gap-4 px-5 py-7 sm:px-8 sm:py-9 md:grid-cols-[1fr_315px] md:gap-6 lg:px-10">
        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-brand sm:text-sm">
            {banglaDate()}
          </span>

          <h1 className="mt-4 max-w-xl text-2xl font-extrabold leading-snug tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            সব পণ্য দেখুন
            <span className="ml-2" aria-hidden="true">↓</span>
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[260px] md:max-w-[315px]">
          <Image
            src="/bazar-hero.png"
            alt="তাজা শাকসবজি ও বাজারের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
