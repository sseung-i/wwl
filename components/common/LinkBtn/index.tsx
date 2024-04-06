import { LinkArrowIcon } from "@/public/assets/icon";
import Link from "next/link";

interface Props {
  arrow?: boolean;
  name: string;
  href: string;
  className?: string;
}

const LinkBtn = ({ arrow,name, href, className }: Props) => {
  return (
    <Link href={href} className={className}>
      {name}
      {arrow && <LinkArrowIcon />}
    </Link>
  );
};

export default LinkBtn;
