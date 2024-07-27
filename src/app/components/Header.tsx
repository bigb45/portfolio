import Link from "next/link";

function Header() {
  return (
    <div className="py-2 flex flex-row justify-between items-center min-w-full h-20 backdrop-blur-md fixed px-80 z-10">
      <div className="text-3xl">PORTOFILO</div>
      <div className="gap-4 flex flex-row sm:hidden md:hidden lg:flex">
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
