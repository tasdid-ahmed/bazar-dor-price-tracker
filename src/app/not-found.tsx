   import Link from "next/link";

   export default function NotFound() {
     return (
       <section className="mx-auto w-full max-w-md px-4 py-20 text-center">
         <p className="text-6xl" aria-hidden="true">🧺</p>
         <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
           ৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি
         </h1>
         <p className="mt-2 text-sm text-gray-500">
           আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।
         </p>
         <Link
           href="/"
           className="mt-6 inline-block rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
         >
           হোম পেজে ফিরে যান
         </Link>
       </section>
     );
   }