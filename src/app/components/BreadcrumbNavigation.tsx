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

function BreadcrumbNavigation() {
    const pathName = usePathname();
    const segments = pathName.split("/").filter(Boolean);
    const isOnHomePage = segments.length == 0;
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        {isOnHomePage ? (
                            <BreadcrumbPage>Home</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
                                        <BreadcrumbPage>
                                            {segment}
                                        </BreadcrumbPage>
                                    ) : (
                                        <Fragment>
                                            <BreadcrumbLink
                                                href={`/${segment}`}
                                            >
                                                {segment}
                                            </BreadcrumbLink>
                                        </Fragment>
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
