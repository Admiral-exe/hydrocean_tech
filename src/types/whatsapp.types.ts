import { CartItem } from "./cart.types";

export interface WhatsAppOrderInput {
  items: CartItem[];
  pincode: string;
  customerName?: string;
  customerAddress?: string;
  couponApplied?: string;
  discountAmount?: number;
  subtotal: number;
  totalPayable: number;
  waterSource?: string;
  notes?: string;
}

export interface WhatsAppDemoBookingInput {
  fullName: string;
  phoneNumber: string;
  address: string;
  pincode: string;
  waterSource: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  notes?: string;
}
