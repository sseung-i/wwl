"use client";

import { LinkArrowIcon } from "@/public/assets/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  arrow?: boolean;
  name: string;
  href: string;
  redirect?: boolean;
  className?: string;
}

const LinkBtn = ({ arrow, name, href, redirect, className }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={`${href}${redirect ? pathname : ""}`} className={className}>
      {name}
      {arrow && <LinkArrowIcon />}
    </Link>
  );
};

export default LinkBtn;
