import S from "./page.module.scss";
import LinkBtn from "@/components/common/LinkBtn";

export default function Home() {
  return (
    <main className={S.main}>
      <LinkBtn name="GIF 생성" href="/create" className={S.createBtn} />
    </main>
  );
}
