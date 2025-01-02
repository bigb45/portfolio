import Link from "next/link";

function Header() {
  return (
    <div className="py-2 flex justify-between items-center min-w-full h-20 backdrop-blur-md fixed px-4 lg:px-80 z-10 w-full">
      <div className="text-3xl flex-grow text-center lg:text-left">PORTOFILO</div>
      <div className="gap-4 flex flex-row hidden sm:hidden md:hidden lg:flex">
        <Link href="/" className="hover:underline decoration-wavy">
          Home
        </Link>
        <Link href="#about">About</Link>
        <Link href="/">Work</Link>
        <Link href="/">Experience</Link>
      </div>
    </div>
  );
}

export default Header;
