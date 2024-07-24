import localFont from "@next/font/local";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const w95fa = localFont({
  src: "../../public/fonts/w95fa.woff2",
  variable: "--font-surt-bold",
});
export const metadata: Metadata = {
  title: "Hello!",
  description: "Mohammed's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={w95fa.className}>{children}</body>
    </html>
  );
}
