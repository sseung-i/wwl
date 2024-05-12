import { Center } from "@/components/layout";
import { Search, SortList } from "@/components/slackticon";
import { Suspense } from "react";

const Slackticon = () => {
  return (
    <Center bg>
      <Search />
      <Suspense>
        <SortList />
      </Suspense>
    </Center>
  );
};

export default Slackticon;
