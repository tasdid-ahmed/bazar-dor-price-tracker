
import { formatPct } from "@/lib/format";
import type { Change } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Change }) {
  const direction = change.dir;

  const styles = {
    up: "bg-red-50 text-rise",
    down: "bg-green-50 text-fall",
    flat: "bg-gray-100 text-gray-600",
  };

  const symbol = {
    up: "▲",
    down: "▼",
    flat: "—",
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${styles[direction]}`}
      aria-label={`দামের পরিবর্তন ${formatPct(change.pct)}`}
    >
      {symbol[direction]} {formatPct(change.pct)}
    </span>
  );
}
