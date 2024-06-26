import {
  NeedLoginBanner,
  LoginedBanner,
  PublicList,
} from "@/components/slackticon";
import S from "./page.module.scss";
import LinkBtn from "@/components/common/LinkBtn";
import { Center } from "@/components/layout";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { LoadingBox } from "@/components/common/Loading";

export default function Home() {
  const accessToken = cookies().get("accessToken")?.value;
  return (
    <Center bg>
      {accessToken ? <LoginedBanner /> : <NeedLoginBanner />}
      {accessToken && (
        <div className={S.btnWrap}>
          <LinkBtn
            name="슬랙티콘 만들기"
            href="/create"
            className={S.createBtn}
          />
        </div>
      )}
      <Suspense fallback={<LoadingBox />}>
        <PublicList />
      </Suspense>
    </Center>
  );
}
