import localFont from "next/font/local";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import React from "react";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Space_Grotesk({ subsets: ["latin"] });
const w95fa = localFont({
    src: "../../public/fonts/w95fa.woff2",
    variable: "--font-surt-bold",
});

const siteDescription =
    "Mohammed Natour — Expert Mobile App Developer & UI/UX Designer specialized in Flutter, React Native, and Jetpack Compose. Explore my portfolio, projects, and insights on app development.";

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
    keywords: [
        "Mohammed Natour",
        "Mobile App Developer",
        "App Development",
        "Flutter Developer",
        "React Native Developer",
        "Jetpack Compose",
        "Android Developer",
        "iOS Developer",
        "UI/UX Design",
        "Figma Designer",
        "Mobile Development Specialist",
        "Software Engineer Portfolio",
    ],
    title: {
        default: "Mohammed Natour | Mobile App Developer & Designer",
        template: "%s | Mohammed Natour",
    },
    description: siteDescription,
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Mohammed Natour",
        title: "Mohammed Natour",
        description: siteDescription,
    },
    twitter: {
        card: "summary_large_image",
        title: "Mohammed Natour",
        description: siteDescription,
    },
    robots: {
        index: true,
        follow: true,
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
                className={`${inter.className} scroll mx-auto max-w-2xl px-2 font-grotesk lg:max-w-4xl`}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
