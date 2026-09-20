import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hydrocean Tech | Certified RO Water Purifiers & Doorstep Service",
  description:
    "Production e-commerce platform for Hydrocean Tech RO water purifiers, replacement filters, and certified doorstep maintenance.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0b3b60",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f4f7fa] text-[#0f172a]">
        {children}
      </body>
    </html>
  );
}
