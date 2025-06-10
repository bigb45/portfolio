"use client";
import React, { useEffect, useState } from "react";

function Project() {
    const [projectId, setProjectId] = useState<string>();
    useEffect(() => {
        setProjectId(window.location.pathname);
        console.log("project id is", projectId);
    }, []);

    return <div>This is the project with id {projectId}</div>;
}

export default Project;
