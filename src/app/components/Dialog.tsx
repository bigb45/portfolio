import Button from "./Button";
import WindowControls from "./WindowControls";

interface DialogProps {
  title: string;
  message: string;
  icon: string;
  onClose: () => void;
  type: "alert" | "confirm";
}

function Dialog({ title, message, onClose, icon, type }: DialogProps) {
  return (
    <div className="pb-2 pt-1 px-1 defaultShadow bg-background">
      <WindowControls
        onClose={() => {}}
        onMaximize={() => {}}
        onMinimize={() => {}}
        showMaximize={false}
        showMinimize={false}
        icon={icon}
        title={title}
        maximizeEnabled={false}
        state="active"
      />
      <div className="mb-10 text-xl">{message}</div>
      <div className="flex flex-row justify-start items-center mx-20">
        <Button label="OK" state="enabled" />
        {/* <Button label="Cancel" state="enabled" /> */}
      </div>
    </div>
  );
}

export default Dialog;
