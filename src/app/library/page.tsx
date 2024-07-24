import Button from "../components/Button";

function Library() {
  return (
    // bg-[#b8b8b8]
    <div className="flex min-h-screen h-full flex-col  items-center justify-start p-10 ">
      <div className="grid">
        <Button state={"highlighted"} label={"button"} />
      </div>
    </div>
  );
}

export default Library;
