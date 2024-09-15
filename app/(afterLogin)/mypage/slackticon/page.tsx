import { Center } from "@/components/layout";
import { Tab } from "@/components/mypage";
import S from "./styles.module.scss";
import { TabType } from "@/components/mypage/slackticon/tab";
import getQueryClient from "@/utils/getQueryClient";
import { getUserSlackticonList } from "@/service/slackticon";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MySlackticonList from "@/components/mypage/slackticon/myList";
import BoxSlackticonList from "@/components/mypage/slackticon/boxList";

const MySlackticonPage = async ({
  searchParams,
}: {
  searchParams: { tab: TabType };
}) => {
  const queryClient = getQueryClient();

  const isMyTab = searchParams.tab === "MY";
  if (isMyTab) {
    await queryClient.prefetchQuery({
      queryKey: ["mySlackticon", null, "1"],
      queryFn: () => getUserSlackticonList({ page: 1, isPublic: null }),
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <Center bg>
      <Tab nowTab={searchParams.tab} />
      <HydrationBoundary state={dehydratedState}>
        {isMyTab ? <MySlackticonList /> : <BoxSlackticonList />}
      </HydrationBoundary>
    </Center>
  );
};

export default MySlackticonPage;
