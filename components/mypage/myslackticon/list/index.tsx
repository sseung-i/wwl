"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TabType } from "../tab";
import S from "./styles.module.scss";
import ReactPaginate from "react-paginate";
import { Modal } from "@/components/common/Modal";
import { LikeIcon } from "@/public/assets/icon";
import { useQuery } from "@tanstack/react-query";
import { getUserSlackticonList } from "@/service/slackticon";
import Image from "next/image";

interface Params {
  nowTab: TabType;
}

const MySlackticonList = ({ nowTab }: Params) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const isPublic =
    searchParams.get("isPublic") === "true"
      ? true
      : searchParams.get("isPublic") === "false"
      ? false
      : null;
  const totalCount = 20;
  const isMyTab = nowTab === "MY";

  const { data } = useQuery({
    queryKey: ["mySlackticon", isPublic, page],
    queryFn: () => getUserSlackticonList({ page, isPublic }),
  });

  const handlePage = (selectedItem: { selected: number }) => {
    router.replace(
      `${pathname}?tab=${nowTab}&page=${selectedItem.selected + 1}`
    );
  };

  const handleDelete = (id: number, title: string) => {
    Modal.confirm({
      title: "삭제 하시겠습니까?",
      content: title,
      onConfirm: () => {
        // todo : mutate ( deleteSlackticon )
      },
    });
  };

  return (
    <div className={S.setionContainer}>
      <div className={S.listTitleWrap}>
        <h3 className={S.title}>{isMyTab ? "내 슬랙티콘" : "담은 리스트"}</h3>
        {isMyTab && <div>전체</div>}
      </div>
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
              <button>
                <LikeIcon width={16} /> {item.likeCount}
              </button>
              <button>다운로드</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={S.pagenationWrap}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel=">"
          onPageChange={handlePage}
          breakLabel="..."
          forcePage={Number(page) - 1}
          renderOnZeroPageCount={null}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalCount}
          containerClassName={S.pagenationContainer}
          pageClassName={S.pageBtn}
          activeClassName={S.active}
          nextClassName={`${S.arrowBtn} ${
            Number(page) < totalCount ? S.active : ""
          }`}
          previousClassName={`${S.arrowBtn} ${
            1 < Number(page) ? S.active : ""
          }`}
          nextRel={null}
        />
      </div>
    </div>
  );
};

export default MySlackticonList;
