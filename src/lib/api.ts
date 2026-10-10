
import { cache } from "react";
import type { Category, Product } from "@/lib/types";

const API_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
] as const;


function extractArray<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload &&
    Array.isArray(payload.data)
  ) {
    return payload.data as T[];
  }

  throw new Error("The API returned an unexpected response format.");
}

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Unable to fetch ${endpoint} from either API.`,
    { cause: lastError },
  );
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const payload = await fetchFromApi<unknown>("/products");
  return extractArray<Product>(payload);
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const payload = await fetchFromApi<unknown>("/categories");
  return extractArray<Category>(payload);
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    const products = await getProducts();
    return products.find((product) => product.slug === slug) ?? null;
  },
);

export const getProductsByCategory = cache(
  async (categorySlug: string): Promise<Product[]> => {
    const products = await getProducts();

    return products.filter(
      (product) => product.category === categorySlug,
    );
  },
);

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const categories = await getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  },
);
