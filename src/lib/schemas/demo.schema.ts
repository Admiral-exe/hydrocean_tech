import { z } from "zod";

export const demoBookingSchema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  phone_number: z
    .string()
    .min(10, "Please enter a valid 10-digit mobile number")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter your full address for technician visit"),
  pincode: z
    .string()
    .length(6, "Please enter a valid 6-digit Indian pincode")
    .regex(/^[0-9]{6}$/, "Pincode must be 6 numeric digits"),
  water_source: z.string().min(1, "Please select water source"),
  preferred_date: z.string().optional().or(z.literal("")),
  preferred_time_slot: z.string().min(1, "Please select preferred time slot"),
  notes: z.string().optional().or(z.literal("")),
});

export type DemoBookingInput = z.infer<typeof demoBookingSchema>;
