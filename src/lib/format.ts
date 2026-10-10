
import type {
  Change,
  ChangeDirection,
  Market,
  PriceSummary,
  Product,
} from "@/lib/types";

const bengaliNumberFormatter = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const bengaliPercentFormatter = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function toBn(value: number): string {
  return bengaliNumberFormatter.format(value);
}

export function formatPrice(value: number): string {
  return `${toBn(value)} টাকা`;
}

export function formatPct(value: number): string {
  return `${bengaliPercentFormatter.format(Math.abs(value))}%`;
}

const UNIT_LABELS = {
  kg: { full: "প্রতি কেজি", short: "কেজি" },
  litre: { full: "প্রতি লিটার", short: "লিটার" },
  dozen: { full: "প্রতি ডজন", short: "ডজন" },
  piece: { full: "প্রতি পিস", short: "পিস" },
} as const;

export function unitLabel(unit: Product["unit"]): string {
  return UNIT_LABELS[unit].full;
}

export function unitShort(unit: Product["unit"]): string {
  return UNIT_LABELS[unit].short;
}

/**
 * Uses the Asia/Dhaka timezone and the current date.
 * Call at render time; do not store a build-time date constant.
 */
export function banglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

export function getChangeDirection(change: Change): ChangeDirection {
  if (change.pct > 0) return "up";
  if (change.pct < 0) return "down";
  return "flat";
}

export function getPriceDifference(product: Product): number {
  return product.today - product.yesterday;
}

export function getPriceDifferenceDirection(
  product: Product,
): ChangeDirection {
  const difference = getPriceDifference(product);

  if (difference > 0) return "up";
  if (difference < 0) return "down";
  return "flat";
}

export function getMarketAverage(market: Market): number {
  return (market.min + market.max) / 2;
}

/**
 * Keep fractional values to two decimal places only when needed.
 * For example: 63.5 -> ৬৩.৫, 63 -> ৬৩.
 */
export function formatAverage(value: number): string {
  return toBn(Number(value.toFixed(2)));
}

/**
 * Product summary:
 * - Minimum: lowest market minimum
 * - Maximum: highest market maximum
 * - Average: rounded mean of market midpoints
 */
export function getPriceSummary(product: Product): PriceSummary {
  if (product.markets.length === 0) {
    return {
      min: product.today,
      max: product.today,
      average: product.today,
    };
  }

  const min = Math.min(...product.markets.map((market) => market.min));
  const max = Math.max(...product.markets.map((market) => market.max));

  const midpointTotal = product.markets.reduce(
    (total, market) => total + getMarketAverage(market),
    0,
  );

  const average = Math.round(midpointTotal / product.markets.length);

  return { min, max, average };
}
