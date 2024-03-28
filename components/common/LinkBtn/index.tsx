import Link from "next/link";

interface Props {
  name: string;
  href: string;
  className: string;
}

const LinkBtn = ({ name, href, className }: Props) => {
  return (
    <Link href={href} className={className}>
      {name}
    </Link>
  );
};

export default LinkBtn;
