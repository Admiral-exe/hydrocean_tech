"use server";

import { createClient } from "@/lib/supabase/server";
import { demoBookingSchema, DemoBookingInput } from "@/lib/schemas/demo.schema";
import { DemoBooking } from "@/types/demo.types";
import { ActionResult } from "@/types/action.types";

export async function createDemoBookingAction(
  data: DemoBookingInput
): Promise<ActionResult<DemoBooking>> {
  try {
    const validated = demoBookingSchema.parse(data);
    const supabase = await createClient();

    const { data: created, error } = await supabase
      .from("demo_bookings")
      .insert({
        ...validated,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: created as DemoBooking };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to submit demo booking",
    };
  }
}

export async function updateDemoStatusAction(
  id: string,
  status: DemoBooking["status"]
): Promise<ActionResult<{ id: string; status: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.app_metadata?.role !== "admin") {
      return { success: false, error: "Unauthorized: Admin privileges required" };
    }

    const { error } = await supabase
      .from("demo_bookings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: { id, status } };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update status",
    };
  }
}
