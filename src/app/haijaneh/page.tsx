import type { Metadata } from "next";
import HaijanehOrEgg from "./HaijanehOrEgg";

export const metadata: Metadata = {
    title: "Haijaneh or Egg",
    description: "Bonk Haijaneh. Do not crack the eggs.",
    robots: { index: false, follow: false },
};

export default function HaijanehPage() {
    return <HaijanehOrEgg />;
}
