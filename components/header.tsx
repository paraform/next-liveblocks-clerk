"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

type HeaderProps = {};

function Header(props: HeaderProps) {
  const pathname = usePathname();

  return (
    <>
      {pathname != "/" && (
        <Link href="/" className="top-4 left-4 absolute z-50">{`< Back`}</Link>
      )}
      <div className="top-4 right-4 absolute z-50">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}

export default Header;
