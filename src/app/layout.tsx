import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SiteShell from "@/components/layout/site-shell";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${notoSansBengali.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "var(--font-noto-bengali), sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}