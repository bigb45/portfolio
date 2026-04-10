import React from "react";
import LoadingSpinner from "./loadingSpinner";

export default function LoadingView() {
    return (
        <div className="flex h-full min-h-[400px] w-full items-center justify-center">
            <LoadingSpinner />
        </div>
    );
}
