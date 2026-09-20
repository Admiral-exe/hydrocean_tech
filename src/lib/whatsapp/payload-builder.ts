import { DEFAULT_WHATSAPP_NUMBER } from "../constants";
import { WhatsAppOrderInput, WhatsAppDemoBookingInput } from "@/types/whatsapp.types";

/**
 * Builds a strict URL-encoded WhatsApp checkout link with formatted order details
 */
export function buildWhatsAppOrderPayload(
  input: WhatsAppOrderInput,
  phoneNumber = DEFAULT_WHATSAPP_NUMBER
): string {
  const lines: string[] = [];

  lines.push("🌊 *NEW ORDER - HYDROCEAN TECH*");
  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push("*Ordered Items:*");

  input.items.forEach((item, index) => {
    const variantTag = item.variant ? ` [${item.variant}]` : "";
    const badge = item.tagBadge ? ` (${item.tagBadge})` : "";
    lines.push(
      `${index + 1}. *${item.name}*${badge}${variantTag}\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString("en-IN")} = *₹${(
        item.price * item.quantity
      ).toLocaleString("en-IN")}*`
    );
  });

  lines.push("━━━━━━━━━━━━━━━━━━━━━");
  lines.push(`*Subtotal:* ₹${input.subtotal.toLocaleString("en-IN")}`);

  if (input.couponApplied && input.discountAmount) {
    lines.push(
      `*Coupon Applied (${input.couponApplied}):* -₹${input.discountAmount.toLocaleString("en-IN")}`
    );
  }

  lines.push("*Standard Installation:* FREE (Included)");
  lines.push("*Express Delivery:* FREE");
  lines.push(`*Total Payable:* ₹${input.totalPayable.toLocaleString("en-IN")}`);
  lines.push("━━━━━━━━━━━━━━━━━━━━━");

  lines.push("*Delivery & Service Address:*");
  if (input.customerName) {
    lines.push(`• *Name:* ${input.customerName}`);
  }
  lines.push(`• *Pincode:* ${input.pincode || "Not specified"}`);
  if (input.customerAddress) {
    lines.push(`• *Address:* ${input.customerAddress}`);
  }
  if (input.waterSource) {
    lines.push(`• *Water Source:* ${input.waterSource}`);
  }
  if (input.notes && input.notes.trim()) {
    lines.push(`• *Notes:* ${input.notes.trim()}`);
  }

  lines.push("\n✅ _Please confirm technician availability and dispatch._");

  const message = lines.join("\n");
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp inquiry link from product detail page
 */
export function buildWhatsAppDirectProductPayload(
  productName: string,
  variant: string,
  price: number,
  quantity = 1,
  phoneNumber = DEFAULT_WHATSAPP_NUMBER
): string {
  const lines: string[] = [
    "🌊 *HYDROCEAN - PRODUCT PURCHASE INQUIRY*",
    "━━━━━━━━━━━━━━━━━━━━━",
    `*Model:* ${productName}`,
    `*Selected Variant:* ${variant}`,
    `*Quantity:* ${quantity}`,
    `*Unit Price:* ₹${price.toLocaleString("en-IN")}`,
    `*Total:* ₹${(price * quantity).toLocaleString("en-IN")}`,
    "━━━━━━━━━━━━━━━━━━━━━",
    "I would like to order this water purifier with free installation. Please confirm technician schedule & same-day dispatch.",
  ];

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Builds WhatsApp link for Free Water Test & Demo Booking
 */
export function buildWhatsAppDemoBookingPayload(
  input: WhatsAppDemoBookingInput,
  phoneNumber = DEFAULT_WHATSAPP_NUMBER
): string {
  const lines: string[] = [
    "🧪 *FREE WATER TEST & DEMO BOOKING*",
    "━━━━━━━━━━━━━━━━━━━━━",
    `*Customer Name:* ${input.fullName}`,
    `*Phone Number:* ${input.phoneNumber}`,
    `*Pincode:* ${input.pincode}`,
    `*Address:* ${input.address}`,
    `*Current Water Source:* ${input.waterSource || "Borewell"}`,
  ];

  if (input.preferredDate) {
    lines.push(`*Preferred Date:* ${input.preferredDate}`);
  }
  if (input.preferredTimeSlot) {
    lines.push(`*Preferred Time Slot:* ${input.preferredTimeSlot}`);
  }
  if (input.notes) {
    lines.push(`*Notes:* ${input.notes}`);
  }

  lines.push("\n_Requesting a certified water specialist visit for doorstep TDS analysis._");

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Builds WhatsApp link for Custom Specialized RO Systems
 */
export function buildWhatsAppCustomROPayload(
  notes = "Inquiry regarding custom high-TDS / salt-free water purifier assembly",
  phoneNumber = DEFAULT_WHATSAPP_NUMBER
): string {
  const lines: string[] = [
    "🛠 *CUSTOM RO PURIFIER INQUIRY*",
    "━━━━━━━━━━━━━━━━━━━━━",
    `*Requirement:* ${notes}`,
    "I need a custom water treatment solution. Please connect me with your technical water specialist.",
  ];

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Builds general customer support and inquiry WhatsApp link
 */
export function buildWhatsAppGeneralInquiryPayload(
  message = "Hello Hydrocean, I have an inquiry regarding water purifiers and doorstep service.",
  phoneNumber = DEFAULT_WHATSAPP_NUMBER
): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

