import Link from "next/link";
import S from "./styles.module.scss";
import LoginoutBtn from "../../common/LoginoutBtn";
import { auth } from "@/app/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className={S.header}>
      <Link href="/">슬랙티콘</Link>
      <div>
        <LoginoutBtn isLogined={!!session} />
      </div>
    </header>
  );
};

export default Header;
