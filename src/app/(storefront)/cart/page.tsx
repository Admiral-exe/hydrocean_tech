import React from "react";
import { CartView } from "@/components/storefront/cart/cart-view";

export const metadata = {
  title: "Your Cart | Hydrocean Tech",
  description: "Review your RO purifiers, filter spares, and checkout directly via WhatsApp.",
};

export default function CartPage() {
  return <CartView />;
}
