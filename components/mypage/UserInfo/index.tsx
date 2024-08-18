"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import S from "./styles.module.scss";
import {
  uploadNickName,
  getUserInfo,
  uploadProfileImage,
} from "@/service/user";
import Image from "next/image";
import { EditImgIcon, EditTxtIcon } from "@/public/assets/icon";
import Swal from "sweetalert2";
import { Modal } from "@/components/common/Modal";
import Toast from "@/components/common/Toast";
import { ChangeEvent } from "react";
import { axiosPost } from "@/utils/axios";

const UserInfo = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });

  const profileMutate = useMutation({
    mutationKey: ["userInfo"],
    mutationFn: (file: File) => uploadProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });
  const nickNameMutate = useMutation({
    mutationKey: ["userInfo"],
    mutationFn: (nickName: string) => uploadNickName(nickName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  const handleEditProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadProfileImage(file);
        profileMutate.mutate(file);
      } catch (err) {
        Toast().fire({
          title: "프로필 수정에 실패하였습니다.",
        });
      }
    }
  };

  const handleEditNickname = async () => {
    const nickName = await Modal.txtInput({
      title: "닉네임 수정",
      inputLabel: "",
      inputPlaceholder: "닉네임을 입력해주세요.",
      maxLength: "10",
    });

    try {
      if (nickName) {
        await uploadNickName(nickName);

        Toast().fire({
          title: "닉네임이 수정되었습니다.",
        });

        nickNameMutate.mutate(nickName);
      }
    } catch (err) {
      Toast().fire({
        title: "닉네임 수정에 실패하였습니다.",
      });
    }
  };

  if (!data) return;

  console.log(`email :: ${data.email}`);

  return (
    <div className={S.userInfoContainer}>
      <div className={S.profile}>
        <Image src={data.profileImageUrl} alt="user profile image" fill />

        <label className={S.editProfile}>
          <input type="file" accept="image" onChange={handleEditProfile} />
          <EditImgIcon />
        </label>
      </div>
      <div className={S.infoWrap}>
        <div className={S.nickName}>
          <span>{data.nickname}</span>
          <button onClick={handleEditNickname}>
            <EditTxtIcon />
          </button>
        </div>
        <div className={S.email}>{data.email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
