import Link from "next/link";
import S from "./styles.module.scss";
import LoginoutBtn from "../LoginoutBtn";

const Header = () => {
  return (
    <header className={S.header}>
      <Link href="/">슬랙티콘</Link>
      <div>
        <LoginoutBtn />
      </div>
    </header>
  );
};

export default Header;
