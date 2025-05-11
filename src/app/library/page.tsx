"use client";
import "xp.css/dist/XP.css";
import Button from "../desktop/components/Button";
import Dialog from "../desktop/components/Dialog";
function Library() {
    function onClose() {}
    function lineBreak(message: string) {
        return message.split("\n").map((line, index) => (
            <div key={index} className="error__message">
                {line}
            </div>
        ));
    }

    return (
        // bg-[#b8b8b8]
        <div className="flex h-full min-h-screen flex-col items-center justify-start bg-foreground p-10">
            <Button label="Open" state="enabled" />
            <Dialog
                icon="icons/package.png"
                title="test"
                message="this is a test"
                onClose={() => {}}
                type="alert"
            />
        </div>
    );
}

export default Library;
