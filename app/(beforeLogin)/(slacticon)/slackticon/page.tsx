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
import { getPublicSlackticonList } from "@/service/slackticon";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();

  return (
    <Center bg>
      {!!session ? <LoginedBanner /> : <NeedLoginBanner />}
      {!!session && (
        <div className={S.btnWrap}>
          <LinkBtn
            name="슬랙티콘 만들기"
            href="/create"
            className={S.createBtn}
          />
        </div>
      )}
      <Suspense fallback={<LoadingBox />}>
        <PrefetchPublicList />
        {/* <PublicList /> */}
      </Suspense>
    </Center>
  );
}

async function PrefetchPublicList() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["/emoticon"],
    queryFn: () => getPublicSlackticonList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicList />
    </HydrationBoundary>
  );
}

// nextjs에서 useQuery사용
// https://velog.io/@stakbucks/React-Query%EC%99%80-streaming-%ED%95%98%EA%B8%B0
