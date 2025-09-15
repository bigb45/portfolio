"use client";
import React, { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

function BreadcrumbNavigation({ className }: { className: string }) {
    const pathName = usePathname();
    const segments = pathName.split("/").filter(Boolean);
    const isOnHomePage = segments.length == 0;
    return (
        <div className={`${className}`}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        {isOnHomePage ? (
                            <BreadcrumbPage className="text-[12px] text-gray-400 lg:text-[14px]">
                                Home
                            </BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink
                                href="/"
                                className="text-[12px] text-gray-400 lg:text-[14px]"
                            >
                                Home
                            </BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                    {isOnHomePage ? <></> : <BreadcrumbSeparator />}
                    {/* <BreadcrumbSeparator /> */}
                    {segments.map((segment, index) => {
                        const isLastItem = index == segments.length - 1;
                        return (
                            <Fragment key={segment}>
                                <BreadcrumbItem>
                                    {isLastItem ? (
                                        <BreadcrumbPage className="text-[12px] text-[#fd6463] lg:text-[14px]">
                                            {segment}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            className="text-[12px] text-gray-400 lg:text-[14px]"
                                            href={`/${segment}`}
                                        >
                                            {segment}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLastItem ? <BreadcrumbSeparator /> : <></>}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbNavigation;
