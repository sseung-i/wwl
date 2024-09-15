"use client";

import { Grid2Icon, Grid3Icon, UnlockIcon } from "@/public/assets/icon";
import S from "./styles.module.scss";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPublicSlackticonList } from "@/service/slackticon";
import Image from "next/image";
import LinkBtn from "@/components/common/LinkBtn";
import ListView from "../ListView";
import { LoadingBox } from "@/components/common/Loading";
import Empty from "@/components/common/Empty";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "@/components/common/Modal";
import { cookies } from "next/headers";
import useObserver from "@/hooks/useObserver";

const SortList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [grid, setGrid] = useState<2 | 3>(3);

  const sort = searchParams.get("sort") || "like";
  const title = searchParams.get("title");
  const tag = searchParams.get("tag");
  const page = 1;

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["/emoticon", title || tag, sort],
      queryFn: ({ pageParam = 1 }) =>
        getPublicSlackticonList(pageParam, { sort, title, tag }),
      getNextPageParam: (data) =>
        data.page < data.totalPage ? data.page + 1 : undefined,
      select: (data) => ({
        emoticons: data?.pages.flatMap((page) => page.emoticons),
        pageParams: data.pageParams,
      }),
      initialPageParam: 1,
    });

  const observerEle = useObserver({ isFetching, fetchNextPage, hasNextPage });

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className={S.sectionContainer}>
      <div className={S.titleWrap}>
        <select className={S.selectBox} value={sort} onChange={handleSort}>
          <option value="like">좋아요 순</option>
          <option value="createdDate">등록 순</option>
        </select>
        <div className={S.gridBtnWrap}>
          <button
            className={grid === 2 ? S.active : undefined}
            onClick={() => setGrid(2)}
          >
            <Grid2Icon />
          </button>
          <button
            className={grid === 3 ? S.active : undefined}
            onClick={() => setGrid(3)}
          >
            <Grid3Icon />
          </button>
        </div>
      </div>
      {isLoading ? (
        <LoadingBox />
      ) : !!data?.emoticons.length ? (
        <>
          <ListView slackticonList={data.emoticons} gridNum={grid} />
          {observerEle}
        </>
      ) : (
        <Empty text="등록된 슬랙티콘이 없습니다." />
      )}
    </section>
  );
};

export default SortList;
