"use client";

import Empty from "@/components/common/Empty";
import useObserver from "@/hooks/useObserver";
import {
  deleteSlackticon,
  getUserBoxList,
  getUserSlackticonList,
} from "@/service/slackticon";
import { Modal } from "@/components/common/Modal";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import S from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { LoadingBox } from "@/components/common/Loading";
import { DownloadIcon, LikeIcon } from "@/public/assets/icon";
import { handleGifDownload } from "@/utils/slackticon";

const BoxSlackticonList = () => {
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["myBox"],
      queryFn: ({ pageParam }) => getUserBoxList({ page: pageParam }),
      getNextPageParam: (data) =>
        data.page < data.totalPage ? data.page + 1 : undefined,
      select: (data) => ({
        emoticons: data?.pages.flatMap((page) => page.emoticons),
        pageParams: data.pageParams,
      }),
      initialPageParam: 1,
    });

  console.log(data, isLoading, isFetching, hasNextPage);

  const observerEle = useObserver({ isFetching, fetchNextPage, hasNextPage });

  const queryClient = useQueryClient();
  const deleteSlacticon = useMutation({
    mutationKey: ["userInfo"],
    mutationFn: (id: number) => deleteSlackticon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mySlackticon"] });
    },
  });

  const handleDelete = (id: number, title: string) => {
    Modal.confirm({
      title: "삭제 하시겠습니까?",
      content: title,
      onConfirm: () => deleteSlacticon.mutate(id),
    });
  };

  return (
    <div className={S.setionContainer}>
      <div className={S.listTitleWrap}>
        <h3 className={S.title}>담은 리스트</h3>
      </div>

      {isLoading ? (
        <LoadingBox />
      ) : !!data?.emoticons.length ? (
        <>
          <ul className={S.itemGrid}>
            {data?.emoticons.map((item, i) => (
              <li key={i} className={S.itemContainer}>
                <div className={S.thumbnailWrap}>
                  <button
                    className={S.deleteBtn}
                    onClick={() => handleDelete(item.id, item.title)}
                  >
                    x
                  </button>

                  <Image
                    src={item.imageUrl}
                    alt={`${item.title} 썸네일 이미지`}
                    fill
                  />
                </div>
                <div className={S.btnWrap}>
                  <button onClick={() => handleGifDownload(item.imageId)}>
                    <DownloadIcon width="16px" /> 다운로드
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {observerEle}
        </>
      ) : (
        <Empty text="담은 슬랙티콘이 없습니다." />
      )}
    </div>
  );
};

export default BoxSlackticonList;
