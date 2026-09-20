"use server";

import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action.types";

export async function uploadProductImageAction(
  formData: FormData
): Promise<ActionResult<{ url: string; path: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== "admin") {
      return { success: false, error: "Unauthorized: Admin privileges required" };
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Sanitize filename & create unique path
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const allowedExts = ["jpg", "jpeg", "png", "webp", "svg"];
    if (!allowedExts.includes(fileExt)) {
      return { success: false, error: "Invalid file type. Supported: JPG, PNG, WEBP, SVG" };
    }

    const cleanName = file.name.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `products/${Date.now()}-${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath);

    return {
      success: true,
      data: {
        url: publicUrl,
        path: filePath,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Image upload failed",
    };
  }
}
