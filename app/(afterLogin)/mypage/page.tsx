import { Center, PageWrapper } from "@/components/layout";
import { MenuList, UserInfo } from "@/components/mypage";
import { getUserInfo } from "@/service/user";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import S from "./page.module.scss";
import Header from "@/components/common/Header";

const Mypage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Center bg>
      <div className={S.contentWrap}>
        <Header />
        <HydrationBoundary state={dehydratedState}>
          <UserInfo />
        </HydrationBoundary>
        <MenuList />
      </div>
    </Center>
  );
};

export default Mypage;
