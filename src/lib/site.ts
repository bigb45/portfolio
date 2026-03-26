/**
 * Set NEXT_PUBLIC_SITE_URL to your production origin (e.g. https://yoursite.com)
 * so metadata, sitemap, and JSON-LD use correct absolute URLs.
 */
export function getSiteUrl(): string {
    const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (url) return url.replace(/\/+$/, "");
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
    return "http://localhost:3000";
}

/** Absolute URL with trailing slash (matches next.config trailingSlash). */
export function absoluteUrl(path: string): string {
    const base = getSiteUrl().replace(/\/+$/, "");
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (normalized === "/") return `${base}/`;
    return `${base}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}
