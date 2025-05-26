import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href={"/"} className="flex flex-col items-center cursor-pointer">
        <Image src="/images/logo1.svg" alt="Logo" width={48} height={48} />
        <span className="text-1xl font-bold text-[#301F45] py-0 my-0">
          Learnie
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
