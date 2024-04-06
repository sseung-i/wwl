import { Banner } from "@/components/home";
import S from "./page.module.scss";
import LinkBtn from "@/components/common/LinkBtn";
import { Center } from "@/components/layout";

export default function Home() {
  return (
    <Center>
        <Banner />
        <div className={S.btnWrap}>
          <LinkBtn name="슬랙티콘 만들기" href="/create" className={S.createBtn} />
        </div>
    </Center>
  );
}
