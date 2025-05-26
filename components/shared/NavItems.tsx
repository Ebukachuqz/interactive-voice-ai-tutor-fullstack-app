"use client";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-center gap-4">
      {navItems.map(({ href, label }, index) => (
        <Link
          className={cn(
            pathName === href && "font-bold",
            "text-[#301F45] hover:text-[#482d68] hover:underline transition-colors duration-200"
          )}
          key={index}
          href={href}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
