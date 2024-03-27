import S from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={S.main}>
      <Link href="/create" className={S.createBtn}>
        GIF 생성
      </Link>
    </main>
  );
}
