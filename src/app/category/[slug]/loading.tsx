function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-paper p-4">
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

export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:py-9"
      aria-busy="true"
      aria-label="পণ্য লোড হচ্ছে"
    >
      <div className="h-24 animate-pulse rounded-2xl border border-gray-200 bg-paper" />
      <div className="h-16 animate-pulse rounded-2xl border border-gray-200 bg-paper" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
