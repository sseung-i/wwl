"use client";

import { Grid2Icon, Grid3Icon, UnlockIcon } from "@/public/assets/icon";
import S from "./styles.module.scss";
import { useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getPublicSlackticonList } from "@/service/slackticon";
import LinkBtn from "@/components/common/LinkBtn";
import ListView from "../ListView";
import { LoadingBox } from "@/components/common/Loading";
import Empty from "@/components/common/Empty";

const PublicList = () => {
  const [grid, setGrid] = useState<2 | 3>(3);

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["/emoticon"],
    queryFn: () => getPublicSlackticonList(),
  });

  return (
    <section className={S.sectionContainer}>
      <div className={S.titleWrap}>
        <h3>
          <UnlockIcon />
          공개 슬랙티콘
        </h3>
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
      {data?.emoticons ? (
        <>
          <ListView slackticonList={data.emoticons} gridNum={grid} />
          <LinkBtn
            arrow
            name="more"
            href="/slackticon/search"
            className={S.slackticonLinkBtn}
          />
        </>
      ) : (
        //  : isLoading ? (
        //   <LoadingBox />
        // )
        <Empty text="등록된 슬랙티콘이 없습니다." />
      )}
    </section>
  );
};

export default PublicList;
