import localFont from "next/font/local";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Space_Grotesk({ subsets: ["latin"] });
const w95fa = localFont({
    src: "../../public/fonts/w95fa.woff2",
    variable: "--font-surt-bold",
});
export const metadata: Metadata = {
    title: "Mohammed Natour",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-grotesk ${inter.className} mx-auto max-w-2xl px-2 lg:max-w-xl">
                <Header />
                {children}
            </body>
        </html>
    );
}
