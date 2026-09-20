export interface DemoBooking {
  id: string;
  full_name: string;
  phone_number: string;
  email?: string | null;
  address: string;
  pincode: string;
  water_source: string;
  preferred_date?: string | null;
  preferred_time_slot: string;
  notes?: string | null;
  status: "pending" | "contacted" | "scheduled" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}
