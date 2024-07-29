function TextChip({ text }: { text: string }) {
  return (
    <div>
      <div className="bg-[#f8f8f8] shadow-[2px_2px_0px_0px_#000] p-2 m-1 border-2 border-black">
        <span className="text-black text-sm">{text}</span>
      </div>
    </div>
  );
}

export default TextChip;
