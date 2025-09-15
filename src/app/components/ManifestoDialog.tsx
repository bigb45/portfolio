import React from "react";
import { Menu, X } from "lucide-react";
import Manifesto from "./Manifesto";
import { FaFistRaised } from "react-icons/fa";

interface ManifestoDialogProps {
    onClose: () => void;
}

function ManifestoDialog({ onClose }: ManifestoDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => onClose()}
            />

            <div className="relative mx-4 overflow-hidden rounded-lg border border-red-600 bg-[#1f1f1f] p-4 font-extrabold text-white md:max-w-[50%]">
                <FaFistRaised
                    className="pointer-events-none absolute bottom-2 right-2 text-7xl text-red-500 opacity-15"
                    size={300}
                />

                <div className="relative mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-lg">
                        <FaFistRaised className="h-6 w-6 text-red-500" />
                        <span>Manifesto</span>
                    </div>
                    <button
                        onClick={() => onClose()}
                        className="p-1 text-white hover:text-gray-300"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="relative z-10 mb-6">
                    <Manifesto />
                </div>

                <div className="relative z-10 flex justify-end gap-3">
                    <button
                        className="w-full rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManifestoDialog;
