import { auth } from "@/app/auth";
import LoginoutBtn from "../LoginoutBtn";
import S from "./styles.module.scss";
import Link from "next/link";
import { HomeIcon } from "@/public/assets/icon";

const Header = async () => {
  const session = await auth();

  return (
    <header className={S.header}>
      <div className={S.siteName}>
        <Link href="/">
          <HomeIcon />
        </Link>
        ㅅㅎㅅ
      </div>
      <div>
        <LoginoutBtn isLogined={!!session} />
      </div>
    </header>
  );
};

export default Header;
