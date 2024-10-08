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
import getQueryClient from "@/utils/getQueryClient";
import { getPublicSlackticonList } from "@/service/slackticon";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";

// const SlackticonList = dynamic(
//   () => import("@/components/slackticon/PublicList")
// );

export default function Home() {
  const accessToken = cookies().get("accessToken")?.value;

  // const queryClient = getQueryClient();

  // queryClient.prefetchQuery({
  //   queryKey: ["/emoticon"],
  //   queryFn: () => getPublicSlackticonList(),
  // });

  // const dehydratedState = dehydrate(queryClient);
  return (
    <Center bg>
      <div> 찐 메인 </div>
      <Link href="/slackticon">슬랙티콘</Link>
    </Center>
  );
}

// export async function PrefetchPublicList() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["/emoticon"],
//     queryFn: () => getPublicSlackticonList(),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <PublicList />
//     </HydrationBoundary>
//   );
// }

// nextjs에서 useQuery사용
// https://velog.io/@stakbucks/React-Query%EC%99%80-streaming-%ED%95%98%EA%B8%B0
