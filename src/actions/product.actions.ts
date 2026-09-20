"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { productSchema, ProductInput } from "@/lib/schemas/product.schema";
import { Product } from "@/types/product.types";
import { ActionResult } from "@/types/action.types";

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin privilege required");
  }
  return { supabase, user };
}

export async function createProductAction(data: ProductInput): Promise<ActionResult<Product>> {
  try {
    const { supabase } = await verifyAdmin();
    const validated = productSchema.parse(data);

    const { data: created, error } = await supabase
      .from("products")
      .insert({
        ...validated,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/catalog");
    revalidatePath(`/product/${validated.slug}`);

    return { success: true, data: created as Product };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create product",
    };
  }
}

export async function updateProductAction(
  id: string,
  data: ProductInput
): Promise<ActionResult<Product>> {
  try {
    const { supabase } = await verifyAdmin();
    const validated = productSchema.parse(data);

    const { data: updated, error } = await supabase
      .from("products")
      .update({
        ...validated,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/catalog");
    revalidatePath(`/product/${validated.slug}`);

    return { success: true, data: updated as Product };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update product",
    };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult<{ id: string }>> {
  try {
    const { supabase } = await verifyAdmin();

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/catalog");

    return { success: true, data: { id } };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete product",
    };
  }
}

export async function toggleProductStockAction(
  id: string,
  isInStock: boolean
): Promise<ActionResult<{ id: string; is_in_stock: boolean }>> {
  try {
    const { supabase } = await verifyAdmin();

    const { error } = await supabase
      .from("products")
      .update({ is_in_stock: isInStock, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/catalog");

    return { success: true, data: { id, is_in_stock: isInStock } };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to toggle stock status",
    };
  }
}

export async function toggleProductPublishAction(
  id: string,
  isPublished: boolean
): Promise<ActionResult<{ id: string; is_published: boolean }>> {
  try {
    const { supabase } = await verifyAdmin();

    const { error } = await supabase
      .from("products")
      .update({ is_published: isPublished, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/catalog");

    return { success: true, data: { id, is_published: isPublished } };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to toggle publication status",
    };
  }
}
