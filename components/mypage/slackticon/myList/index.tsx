"use client";

import Empty from "@/components/common/Empty";
import useObserver from "@/hooks/useObserver";
import { deleteSlackticon, getUserSlackticonList } from "@/service/slackticon";
import { Modal } from "@/components/common/Modal";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import S from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoadingBox } from "@/components/common/Loading";
import { LikeIcon } from "@/public/assets/icon";

const MySlackticonList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isPublic =
    searchParams.get("isPublic") === "true"
      ? true
      : searchParams.get("isPublic") === "false"
      ? false
      : null;

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["mySlackticon", isPublic],
      queryFn: ({ pageParam }) =>
        getUserSlackticonList({ page: pageParam, isPublic }),
      getNextPageParam: (data) =>
        data.page < data.totalPage ? data.page + 1 : undefined,
      select: (data) => ({
        emoticons: data?.pages.flatMap((page) => page.emoticons),
        pageParams: data.pageParams,
      }),
      initialPageParam: 1,
    });

  const ObserverEle = useObserver({ isFetching, fetchNextPage, hasNextPage });

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

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("isPublic", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={S.setionContainer}>
      <div className={S.listTitleWrap}>
        <h3 className={S.title}>내 슬랙티콘</h3>
        <select
          value={searchParams.get("isPublic") || "null"}
          onChange={handleSort}
        >
          <option value="null">전체</option>
          <option value="true">공개</option>
          <option value="false">비공개</option>
        </select>
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
                  <p className={S.title}>{item.title}</p>
                  <button>
                    <LikeIcon width={16} /> {item.likeCount}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {ObserverEle}
        </>
      ) : (
        <Empty text="등록된 슬랙티콘이 없습니다." />
      )}
    </div>
  );
};

export default MySlackticonList;
