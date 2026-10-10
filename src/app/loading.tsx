
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-[#fafcf9] p-4">
      <div className="flex items-start gap-3">
        <div className="size-12 rounded-xl bg-gray-200" />

        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-gray-100" />
          <div className="h-5 w-24 rounded bg-gray-200" />
        </div>
        <div className="h-6 w-16 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

function SkeletonSection({ count }: { count: number }) {
  return (
    <section className="space-y-4">
      <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-9 px-4 py-6 sm:space-y-12 sm:py-9"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="flex min-h-64 animate-pulse items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-[#fafcf9] p-6 sm:p-10">
        <div className="w-full max-w-lg space-y-4">
          <div className="h-7 w-36 rounded-full bg-gray-200" />
          <div className="h-8 w-full max-w-md rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-4/5 rounded bg-gray-100" />
          <div className="h-11 w-36 rounded-xl bg-gray-200" />
        </div>
        <div className="hidden h-40 w-48 rounded-2xl bg-gray-100 sm:block" />
      </div>

      <SkeletonSection count={6} />
      <SkeletonSection count={6} />
      <SkeletonSection count={9} />
    </div>
  );
}
