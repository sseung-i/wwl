import Link from "next/link";
import S from "./styles.module.scss";

const Header = () => {
  return (
    <header className={S.header}>
      <Link href="/">슬랙티콘</Link>
      <div>버튼</div>
    </header>
  );
};

export default Header;
