"use client";
import { useEffect, useRef, useState } from "react";
import { Dot, MoreVertical, Pencil } from "lucide-react";
import React from "react";

function Tasks() {
    return (
        <div className="flex flex-row">
            <div className="mt-8 flex flex-row gap-8">
                <div className="ticket-container flex h-[calc(100vh-8rem)] w-[300px] flex-col gap-2 rounded-xl border-[1px] border-gray-300 bg-gray-50 p-2">
                    {" "}
                    <TicketCard />
                    <TicketCard />
                    <TicketCard />
                </div>
                <div className="ticket-container h-[calc(100vh-8rem)] w-[300px] rounded-md border-[1px] border-gray-300 bg-gray-50"></div>
                <div className="ticket-container h-[calc(100vh-8rem)] w-[300px] rounded-md border-[1px] border-gray-300 bg-gray-50"></div>
                <div className="ticket-container h-[calc(100vh-8rem)] w-[300px] rounded-md border-[1px] border-gray-300 bg-gray-50"></div>
            </div>
        </div>
    );
}

function TicketCard() {
    const [isEditing, setIsEditing] = useState(false);
    const [existingText, setExistingText] = useState("this");
    const [oldText, setOldText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length,
            );
        }
    }, [isEditing]);
    function abortEditing() {
        setIsEditing(false);
        setExistingText(oldText);
    }
    return (
        <div className="ticket relative flex h-[200px] flex-col rounded-md border-[1px] border-gray-300 bg-white p-2 shadow-sm">
            <div className="group/title flex flex-row justify-center gap-2">
                {isEditing ? (
                    <textarea
                        ref={textareaRef}
                        value={existingText}
                        onChange={(e) => {
                            setExistingText(e.currentTarget.value);
                        }}
                        className="w-full resize-none rounded-md bg-gray-100 p-1 outline-none transition-all duration-100"
                    />
                ) : (
                    <p
                        className="line-clamp-2 w-full overflow-hidden truncate overflow-ellipsis whitespace-pre-wrap break-words p-1 text-start"
                        onClick={() => {
                            setIsEditing(true);
                            setOldText(existingText);
                        }}
                    >
                        {existingText}
                    </p>
                )}
                <div className="h-fit w-fit rounded-full p-2 text-gray-500 opacity-0 transition-all duration-100 hover:bg-gray-200 group-hover/title:opacity-100">
                    <MoreVertical height={16} width={16} className="" />{" "}
                </div>
            </div>
            {isEditing && (
                <>
                    <div
                        className="absolute bottom-2 right-2 w-fit rounded-md bg-gray-200 px-2 py-1 text-xs"
                        onClick={() => {
                            // setExistingText(e.currentTarget.value);
                            setIsEditing(false);
                        }}
                    >
                        Save
                    </div>
                    <div
                        className="absolute bottom-2 right-16 w-fit rounded-md px-2 py-1 text-xs"
                        onClick={() => {
                            abortEditing();
                        }}
                    >
                        Cancel
                    </div>
                </>
            )}

            <p>urgency</p>
        </div>
    );
}

export default Tasks;
