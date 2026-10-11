export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-2xl animate-pulse space-y-6 px-4 py-8 sm:py-10"
      aria-busy="true"
      aria-label="প্রোফাইল লোড হচ্ছে"
    >
      <div className="space-y-2">
        <div className="h-7 w-44 rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-100" />
      </div>
      <div className="h-28 rounded-2xl border border-gray-200 bg-paper" />
    </div>
  );
}
