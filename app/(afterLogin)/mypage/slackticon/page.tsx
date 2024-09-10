import { Center } from "@/components/layout";
import { Tab } from "@/components/mypage";
import S from "./styles.module.scss";
import { TabType } from "@/components/mypage/myslackticon/tab";
import MySlackticonList from "@/components/mypage/myslackticon/list";

const MySlackticonPage = ({
  searchParams,
}: {
  searchParams: { tab: TabType };
}) => {
  return (
    <Center bg>
      <Tab nowTab={searchParams.tab} />
      <MySlackticonList nowTab={searchParams.tab} />
    </Center>
  );
};

export default MySlackticonPage;
