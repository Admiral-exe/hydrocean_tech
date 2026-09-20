import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product.types";
import { Category } from "@/types/category.types";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./mock-data";

/**
 * Checks whether live Supabase credentials are configured with a valid host.
 * Prevents DNS lookup hangs against non-existent or mock domains.
 */
function isConfiguredSupabase(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  if (
    url.includes("mock-hydrocean") ||
    url.includes("your-project.supabase.co") ||
    key.includes("mock-anon-key") ||
    key.includes("your-anon-key")
  ) {
    return false;
  }
  return true;
}

/**
 * Helper to race any promise or thenable against a fast timeout (prevents hanging requests).
 */
async function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 1500): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase request timeout")), timeoutMs)
    ),
  ]);
}

interface QueryResult<T> {
  data: T | null;
  error: { message: string } | null;
}

export async function getProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  if (!isConfiguredSupabase()) {
    return filterMockProducts(options);
  }

  try {
    const supabase = await createClient();
    let query = supabase.from("products").select("*").eq("is_published", true);

    if (options?.featuredOnly) {
      query = query.eq("is_featured", true);
    }

    const res = (await withTimeout(query)) as QueryResult<Product[]>;
    if (res.error || !res.data || res.data.length === 0) {
      return filterMockProducts(options);
    }
    return res.data;
  } catch {
    return filterMockProducts(options);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isConfiguredSupabase()) {
    const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return mock || null;
  }

  try {
    const supabase = await createClient();
    const query = supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    const res = (await withTimeout(query)) as QueryResult<Product>;

    if (res.error || !res.data) {
      const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
      return mock || null;
    }
    return res.data;
  } catch {
    const mock = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return mock || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isConfiguredSupabase()) {
    return MOCK_CATEGORIES;
  }

  try {
    const supabase = await createClient();
    const query = supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    const res = (await withTimeout(query)) as QueryResult<Category[]>;

    if (res.error || !res.data || res.data.length === 0) {
      return MOCK_CATEGORIES;
    }
    return res.data;
  } catch {
    return MOCK_CATEGORIES;
  }
}

function filterMockProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
}): Product[] {
  let list = [...MOCK_PRODUCTS];
  if (options?.featuredOnly) {
    list = list.filter((p) => p.is_featured);
  }
  if (options?.categorySlug && options.categorySlug !== "all") {
    const cat = MOCK_CATEGORIES.find((c) => c.slug === options.categorySlug);
    if (cat) {
      list = list.filter((p) => p.category_id === cat.id);
    }
  }
  return list;
}
