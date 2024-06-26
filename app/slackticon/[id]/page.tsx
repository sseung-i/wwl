import { LoadingBox } from "@/components/common/Loading";
import { Center } from "@/components/layout";
import { Detail, Search, SortList } from "@/components/slackticon";
import { getSlackticonDetail } from "@/service/slackticon";
import getQueryClient from "@/utils/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const SlackticonDetail = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["slacticonDetail", params.id],
    queryFn: () => getSlackticonDetail(params.id),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Center>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<LoadingBox />}>
          <Detail />
        </Suspense>
      </HydrationBoundary>
    </Center>
  );
};

export default SlackticonDetail;
