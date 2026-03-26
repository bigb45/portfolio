import { headers } from "next/headers";

/**
 * Set NEXT_PUBLIC_SITE_URL to your production origin (e.g. https://yoursite.com)
 * so metadata, sitemap, and JSON-LD use correct absolute URLs.
 *
 * For Google Search Console, this should match the **exact** property you verify
 * (same host, and choose either www or non-www consistently).
 */
export function getSiteUrl(): string {
    const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (url) return url.replace(/\/+$/, "");
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
    return "http://localhost:3000";
}

/**
 * Origin for sitemap and robots sitemap line.
 *
 * 1. If `NEXT_PUBLIC_SITE_URL` is set, always use it (recommended for production).
 * 2. Otherwise use the incoming request host (so `https://yourdomain.com/sitemap.xml`
 *    lists `yourdomain.com` URLs — fixes GSC "URL not allowed" when the build
 *    would otherwise use `*.vercel.app`).
 * 3. Fallback: `VERCEL_URL` / localhost.
 */
export function getSitemapOrigin(): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (configured) return configured.replace(/\/+$/, "");

    try {
        const h = headers();
        const hostHeader = h.get("x-forwarded-host") ?? h.get("host");
        if (hostHeader) {
            const host = hostHeader.split(",")[0].trim();
            const protoHeader =
                h.get("x-forwarded-proto") ??
                (process.env.VERCEL ? "https" : "http");
            const proto = protoHeader.split(",")[0].trim();
            return `${proto}://${host}`;
        }
    } catch {
        // No request context (e.g. some static analysis paths)
    }

    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
    return "http://localhost:3000";
}

/** Absolute URL with trailing slash (matches next.config trailingSlash). */
export function absoluteUrl(path: string): string {
    const base = getSiteUrl().replace(/\/+$/, "");
    return absoluteUrlWithBase(base, path);
}

/** Same as absoluteUrl but with an explicit origin (used by the sitemap). */
export function absoluteUrlWithBase(base: string, path: string): string {
    const baseClean = base.replace(/\/+$/, "");
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (normalized === "/") return `${baseClean}/`;
    return `${baseClean}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}
