"use client";

import { getSlackticonDetail } from "@/service/slackticon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import S from "./styles.module.scss";
import { LoadingBox, LoadingSpinner } from "@/components/common/Loading";
import { Section } from "@/components/layout";
import { Swiper, SwiperSlide } from "swiper/react";

const SlacticonDetail = () => {
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["slacticonDetail", params.id],
    queryFn: () => getSlackticonDetail(params.id as string),
  });
  return !!data ? (
    <>
      <section className={S.detailContainer}>
        <div className={S.thumbnailWrap}>
          {/* <Image src={data.imageUrl} alt="썸네일 이미지" fill /> */}
        </div>

        <Section>
          <h3 className={S.title}>{data.title}</h3>
        </Section>
        <Section title="소개글">
          <p className={S.description}>{data.description}</p>
        </Section>
        <Section title="태그">
          <ul className={S.tagList}>
            {data.tags.map((tag, index) => (
              <li key={`${tag}-${index}`} className={S.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </Section>
      </section>
      <section className={S.userContainer}>
        <div className={S.userProfileWrap}>
          <div className={S.userProfile}></div>
          <h3>유저 아이디</h3>
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
  ) : (
    <LoadingBox />
  );
};

export default SlacticonDetail;
