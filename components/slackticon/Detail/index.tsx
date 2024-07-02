"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import S from "./styles.module.scss";
import {
  getSlackticonDetail,
  handleEmoticonBox,
  handleEmoticonLike,
} from "@/service/slackticon";
import { LoadingBox, LoadingSpinner } from "@/components/common/Loading";
import { Section } from "@/components/layout";
import Toast from "@/components/common/Toast";
import { DownloadIcon, LikeIcon, SaveBoxIcon } from "@/public/assets/icon";
import { handleGifDownload } from "@/utils/slackticon";

const SlackticonDetail = () => {
  const params = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["slackticonDetail", params.id],
    queryFn: () => getSlackticonDetail(params.id as string),
  });

  if (!data) return;

  const handleLiked = async (emoticonId: number) => {
    const nowStatus = await handleEmoticonLike(emoticonId);

    if (!!nowStatus) {
      Toast().fire({
        title:
          nowStatus === "LIKE"
            ? "슬랙티콘을 추천하였습니다 👍 "
            : "추천을 해제했어요 😢",
      });
      refetch();
    } else {
      Toast().fire({
        title: "에러로 인해 추천에 실패하였습니다.",
      });
    }
  };

  const handleInMyBox = async (emoticonId: number) => {
    const nowStatus = await handleEmoticonBox(emoticonId);
    // response data : ADD || REMOVE
    if (!!nowStatus) {
      Toast().fire({
        title:
          nowStatus === "ADD"
            ? "담은리스트에 추가하였습니다."
            : "담은리스트에서 삭제하였습니다.",
      });
      refetch();
    } else {
      Toast().fire({
        title: "에러로 인해 담기 수정에 실패하였습니다.",
      });
    }
  };

  const {
    id,
    userId,
    title,
    description,
    imageUrl,
    tags,
    likeCount,
    isLiked,
    isInBox,
    isMine,
    userName,
  } = data;

  const Download = ({ imgUrl }: { imgUrl: string }) => (
    <button onClick={() => handleGifDownload(imgUrl)}>
      <DownloadIcon width="18px" /> 다운로드
    </button>
  );

  const SaveBox = ({
    emoticonId,
    isInBox,
  }: {
    emoticonId: number;
    isInBox: boolean;
  }) => (
    <button onClick={() => handleInMyBox(emoticonId)}>
      <SaveBoxIcon width="18px" />
      담기{isInBox && " 취소"}
    </button>
  );

  return (
    <>
      <div className={S.detailContainer}>
        <Section>
          <h3 className={S.title}>{title}</h3>
        </Section>
        <Section>
          <button
            className={`${S.likeBtn} ${isLiked ? S.active : ""}`}
            onClick={() => handleLiked(id)}
          >
            <LikeIcon /> 추천 {likeCount}
          </button>
          <div className={S.thumbnailWrap}>
            <Image src={imageUrl} alt="썸네일 이미지" fill />
          </div>
          <div className={S.buttonWrap}>
            {isMine ? (
              <Download imgUrl={imageUrl} />
            ) : isInBox ? (
              <>
                <SaveBox isInBox={isInBox} emoticonId={id} />
                <Download imgUrl={imageUrl} />
              </>
            ) : (
              <SaveBox isInBox={isInBox} emoticonId={id} />
            )}
          </div>
        </Section>
        <Section title="소개글">
          <p className={S.description}>{description}</p>
        </Section>
        <Section title="태그">
          <ul className={S.tagList}>
            {tags.map((tag, index) => (
              <li key={`${tag}-${index}`} className={S.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </Section>
      </div>
      <section className={S.userContainer}>
        <div className={S.userProfileWrap}>
          <div className={S.userProfile}></div>
          <h3>{userName}</h3>
        </div>
        <Swiper slidesPerView={"auto"} spaceBetween={10} className={S.imgList}>
          {[1, 1, 1].map((item, index) => (
            <SwiperSlide key={index} className={S.customSlide}>
              <div className={S.imgWrap}></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default SlackticonDetail;
