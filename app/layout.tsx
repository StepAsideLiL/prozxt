import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s - Prozxt",
    default: "Prozxt",
  },
  description: "Your online portfolio in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
