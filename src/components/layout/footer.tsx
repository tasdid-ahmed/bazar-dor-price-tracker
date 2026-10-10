
export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-[#fafcf9]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs leading-6 text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-sm">
        <p>
          <span className="font-bold text-gray-700">বাজার দর</span>
          {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
