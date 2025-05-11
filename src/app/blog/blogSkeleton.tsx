import { Link, Pin } from "lucide-react";
import React from "react";

export default function BlogSkeleton() {
    return (
        <div>
            <div className="h-[2px] w-full bg-gray-300"></div>

            <div className="h- w-full border-b border-gray-300 p-4">
                <div className="mb-2 flex justify-between">
                    <div className="h-2 w-32 animate-pulse rounded-sm bg-gray-400" />
                    <div className="h-4 w-4 animate-pulse rounded-sm bg-gray-400" />
                </div>
                <div className="mb-1 h-2 w-20 animate-pulse rounded-sm bg-gray-300" />
                <div className="h-2 w-40 animate-pulse rounded-sm bg-gray-400" />
            </div>
        </div>
    );
}
