"use client";

import LinkBtn from "@/components/common/LinkBtn";
import S from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/user";
import Image from "next/image";

const LoginedBanner = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  return (
    <div className={S.bannerContainer}>
      <div className={S.profileWrap}>
        {data && <Image src={data.profileImageUrl} alt="프로필 이미지" fill />}
      </div>
      <div>
        <h2>
          {isLoading ? "user name" : data?.nickname}님<br />
          반갑습니다.
        </h2>
        <LinkBtn arrow name="My page" href="/mypage" className={S.LinkBtn} />
      </div>
    </div>
  );
};

export default LoginedBanner;
