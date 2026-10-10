
"use client";

import { useEffect, useState } from "react";
import { banglaDate } from "@/lib/format";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => setDate(banglaDate());
    updateDate();

    const timer = window.setInterval(updateDate, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="text-[10px] text-gray-500 sm:text-xs">
      {date || "বাংলাদেশের আজকের তারিখ"}
    </p>
  );
}
