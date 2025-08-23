import React from "react";

function CaseStudyFooter({
    className,
    onViewMoreClick,
    onGetInTouchClick,
}: { className: string } & {
    onViewMoreClick: () => void;
    onGetInTouchClick: () => void;
}) {
    return (
        <div className={`${className} w-full`}>
            <div className="mb-10 h-[1px] w-full bg-slate-400"></div>
            <div className="flex flex-col items-center justify-center gap-10">
                <p>Ready to get your project started?</p>
                <div className="flex gap-4 text-sm">
                    <div
                        className="rounded-md bg-gray-900 p-4 text-white hover:bg-gray-700"
                        onClick={() => {
                            onGetInTouchClick();
                        }}
                    >
                        Get in touch
                    </div>
                    <div
                        className="rounded-md border-gray-900 bg-white p-4 hover:bg-slate-200"
                        onClick={() => {
                            onViewMoreClick();
                        }}
                    >
                        View more case studies
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseStudyFooter;
