import { LoadingBox } from "@/components/common/Loading";
import { Center } from "@/components/layout";
import { Detail, Search, SortList } from "@/components/slackticon";
import {
  getDetailUserSlackticon,
  getSlackticonDetail,
} from "@/service/slackticon";
import getQueryClient from "@/utils/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const SlackticonDetail = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["slackticonDetail", params.id],
    queryFn: () => getSlackticonDetail(params.id),
  });

  await queryClient.prefetchQuery({
    queryKey: ["slackticonDetailUser", params.id],
    queryFn: () => getDetailUserSlackticon(params.id),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Center>
      <HydrationBoundary state={dehydratedState}>
        <Detail />
      </HydrationBoundary>
    </Center>
  );
};

export default SlackticonDetail;
