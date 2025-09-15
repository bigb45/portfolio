import Link from "next/link";

const NavigationLinks = ({ className = "", linkClassName = "" }) => {
    const links = [
        { href: "/blog", label: "Blog" },
        { href: "/case-studies", label: "Case studies" },
        { href: "/projects", label: "Projects" },
        { href: "/", label: "Secret" },
    ];

    return (
        <div className={className}>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`squiggle ${linkClassName}`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default NavigationLinks;
