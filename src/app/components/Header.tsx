import Link from "next/link";
import BreadcrumbNavigation from "./BreadcrumbNavigation";

function Header() {
    return (
        <div className="flex flex-col">
            <div className="z-10 mx-auto flex h-20 w-full max-w-2xl items-center justify-between lg:max-w-4xl">
                <Link
                    href="/"
                    className="flex-grow text-center font-space text-[48px] lg:text-left"
                >
                    Natour
                </Link>
                <div className="hidden flex-row gap-4 lg:flex">
                    <Link href="/blog" className="squiggle text-[18px]">
                        Blog
                    </Link>
                    <Link href="/case-studies" className="squiggle text-[18px]">
                        Case studies
                    </Link>
                    <Link href="/projects" className="squiggle text-[18px]">
                        Projects
                    </Link>
                    <Link href="/" className="squiggle text-[18px]">
                        Secret
                    </Link>
                </div>
            </div>
            <div className="flex w-full justify-around py-3 lg:hidden">
                <div className="flex gap-3 text-[16px] font-medium text-gray-700">
                    <Link href="/blog" className="squiggle">
                        Blog
                    </Link>
                    <Link href="/case-studies" className="squiggle">
                        Case studies
                    </Link>
                    <Link href="/projects" className="squiggle">
                        Projects
                    </Link>
                    <Link href="/" className="squiggle">
                        Secret
                    </Link>
                </div>
            </div>
            <BreadcrumbNavigation />
        </div>
    );
}

export default Header;
