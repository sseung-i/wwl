"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import S from "./styles.module.scss";
import { editNickName, getUserInfo } from "@/service/user";
import Image from "next/image";
import { EditImgIcon, EditTxtIcon } from "@/public/assets/icon";
import Swal from "sweetalert2";
import { Modal } from "@/components/common/Modal";
import Toast from "@/components/common/Toast";

const UserInfo = () => {
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
  });

  const nickNameMutate = useMutation({
    mutationKey: ["userInfo"],
    mutationFn: (nickName: string) => editNickName(nickName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  const handleEditNickname = async () => {
    const { value: nickName } = await Swal.fire({
      title: "닉네임 수정",
      input: "text",
      inputLabel: "",
      inputPlaceholder: "닉테임을 입력해주세요.",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    try {
      if (nickName) {
        const res = await editNickName(nickName);

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
        <div className={S.editProfile}>
          <EditImgIcon />
        </div>
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
