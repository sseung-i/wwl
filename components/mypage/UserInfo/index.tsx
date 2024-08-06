"use client";

import { useQuery } from "@tanstack/react-query";
import S from "./styles.module.scss";
import { getUserInfo } from "@/service/user";
import Image from "next/image";
import { EditImgIcon, EditTxtIcon } from "@/public/assets/icon";

const UserInfo = () => {
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });

  if (!data) return;

  return (
    <div className={S.userInfoContainer}>
      <div className={S.profile}>
        <Image src={data.profileImageUrl} alt="user profile image" fill />
        <div className={S.editProfile}>
          <EditImgIcon />
        </div>
      </div>
      <div className={S.infoWrap}>
        <div className={S.nickName}>
          <span>{data.nickname}</span>
          <EditTxtIcon />
        </div>
        <div className={S.email}>{data.email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
