import Link from "next/link";

function Header() {
  return (
    <div className="py-2 flex justify-between items-center min-w-full h-20 backdrop-blur-md fixed px-4 lg:px-80 z-10 w-full">
      <div className="text-3xl flex-grow text-center lg:text-left">PORTOFILO</div>
      <div className="gap-4 flex flex-row hidden sm:hidden md:hidden lg:flex">
        <Link href="/" 
        className="squiggle"
        >
          Home
        </Link>
        <Link href="#about" className="squiggle">About</Link>
        <Link href="/" className="squiggle">Work</Link>
        <Link href="/" className="squiggle">Experience</Link>
      </div>
    </div>
  );
}

export default Header;
