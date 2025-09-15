"use client";
import Link from "next/link";
import BreadcrumbNavigation from "./BreadcrumbNavigation";
import { Menu, X } from "lucide-react";
import { FaFistRaised } from "react-icons/fa";
import NavigationLinks from "./NavigationLink";
import { useState } from "react";
import ManifestoDialog from "./ManifestoDialog";

function Header() {
    const [isManifestoOpen, setIsManifestoOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="z-10 mx-auto flex h-20 w-full max-w-2xl items-center justify-between lg:max-w-4xl">
                <Link
                    href="/"
                    className="text-center font-space text-[48px] lg:text-left"
                >
                    Natour
                </Link>

                {/* Desktop Navigation - hidden on mobile */}
                <NavigationLinks
                    className="hidden flex-row gap-4 lg:flex"
                    linkClassName="text-[18px]"
                />

                {/* Manifesto Button - only visible on mobile */}
                <button
                    onClick={() => setIsManifestoOpen(true)}
                    className="rounded-full p-2 hover:bg-red-50 lg:hidden"
                >
                    <FaFistRaised size={24} color="red" />
                </button>
            </div>

            <div className="flex w-full justify-around py-3 lg:hidden">
                <NavigationLinks className="flex gap-3 text-[16px] font-medium text-gray-700" />
            </div>

            <BreadcrumbNavigation className="p-1" />

            {isManifestoOpen && (
                <ManifestoDialog onClose={() => setIsManifestoOpen(false)} />
            )}
        </div>
    );
}

export default Header;
