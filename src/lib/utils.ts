import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getS3Url(path?: string) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = process.env.NEXT_PUBLIC_S3_URL ?? "";
    if (!base) return path;
    return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
