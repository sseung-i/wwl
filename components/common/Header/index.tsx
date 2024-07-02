import Link from "next/link";
import S from "./styles.module.scss";
import LoginoutBtn from "../LoginoutBtn";
import { cookies } from "next/headers";

const Header = () => {
  const isLogined = cookies().has("accessToken");

  return (
    <header className={S.header}>
      <Link href="/">슬랙티콘</Link>
      <div>
        <LoginoutBtn isLogined={isLogined} />
      </div>
    </header>
  );
};

export default Header;
