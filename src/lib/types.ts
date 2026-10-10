
export type ChangeDirection = "up" | "down" | "flat";

export interface Change {
  dir: ChangeDirection;
  pct: number;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Category {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
}

export interface PriceSummary {
  min: number;
  max: number;
  average: number;
}
