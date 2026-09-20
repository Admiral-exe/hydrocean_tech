"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { categorySchema, CategoryInput } from "@/lib/schemas/category.schema";
import { Category } from "@/types/category.types";
import { ActionResult } from "@/types/action.types";

async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    throw new Error("Unauthorized: Admin privilege required");
  }
  return { supabase };
}

export async function createCategoryAction(data: CategoryInput): Promise<ActionResult<Category>> {
  try {
    const { supabase } = await verifyAdmin();
    const validated = categorySchema.parse(data);

    const { data: created, error } = await supabase
      .from("categories")
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

    return { success: true, data: created as Category };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create category",
    };
  }
}

export async function updateCategoryAction(
  id: string,
  data: CategoryInput
): Promise<ActionResult<Category>> {
  try {
    const { supabase } = await verifyAdmin();
    const validated = categorySchema.parse(data);

    const { data: updated, error } = await supabase
      .from("categories")
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

    return { success: true, data: updated as Category };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update category",
    };
  }
}

export async function deleteCategoryAction(id: string): Promise<ActionResult<{ id: string }>> {
  try {
    const { supabase } = await verifyAdmin();

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/catalog");

    return { success: true, data: { id } };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete category",
    };
  }
}
