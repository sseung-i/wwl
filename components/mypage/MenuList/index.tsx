"use client";

import { LinkArrowIcon } from "@/public/assets/icon";
import S from "./styles.module.scss";
import Link from "next/link";
import { Modal } from "@/components/common/Modal";
import { deleteUser } from "@/service/user";
import { signOut } from "next-auth/react";
import { clientCookies } from "@/utils/cookie";

const MenuList = () => {
  return (
    <div className={S.menuContainer}>
      <Link href="/slackticon" className={S.menuList}>
        <h4>슬랙티콘</h4>
        <LinkArrowIcon className={S.icon} />
      </Link>

      <div className={S.menuList}>
        <h4>COMMING SOON...</h4>
        <LinkArrowIcon className={S.icon} />
      </div>
      <div
        className={S.menuList}
        onClick={() =>
          Modal.confirm({
            title: "회원을 탈퇴하시겠습니까?",
            content: "탈퇴 시 등록한 게시글은 전부 삭제됩니다.",
            // confirmBtn: "탈퇴하기",
            onConfirm: async () => {
              const data = await deleteUser();

              if (data.result === "success") {
                signOut();
                clientCookies.delete("accessToken");
                clientCookies.delete("refreshToken");

                Modal.alert({
                  title: "탈퇴가 완료되었습니다.",
                });
              }
            },
          })
        }
      >
        <h4>회원탈퇴</h4>
        <LinkArrowIcon className={S.icon} />
      </div>
    </div>
  );
};

export default MenuList;
