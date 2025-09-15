import localFont from "next/font/local";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Space_Grotesk({ subsets: ["latin"] });
const w95fa = localFont({
    src: "../../public/fonts/w95fa.woff2",
    variable: "--font-surt-bold",
});
export const metadata: Metadata = {
    title: "Mohammed Natour",
    description: "",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} scroll mx-auto max-w-2xl select-none px-2 font-grotesk lg:max-w-4xl`}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
