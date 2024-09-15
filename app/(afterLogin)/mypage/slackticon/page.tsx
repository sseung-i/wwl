import { Center } from "@/components/layout";
import { Tab } from "@/components/mypage";
import S from "./styles.module.scss";
import { TabType } from "@/components/mypage/myslackticon/tab";
import MySlackticonList from "@/components/mypage/myslackticon/list";
import getQueryClient from "@/utils/getQueryClient";
import { getUserSlackticonList } from "@/service/slackticon";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const MySlackticonPage = async ({
  searchParams,
}: {
  searchParams: { tab: TabType };
}) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["mySlackticon", null, "1"],
    queryFn: () => getUserSlackticonList({ page: "1", isPublic: null }),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Center bg>
      <Tab nowTab={searchParams.tab} />
      <HydrationBoundary state={dehydratedState}>
        <MySlackticonList nowTab={searchParams.tab} />
      </HydrationBoundary>
    </Center>
  );
};

export default MySlackticonPage;
