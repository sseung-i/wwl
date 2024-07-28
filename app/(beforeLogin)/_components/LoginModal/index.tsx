"use client";

import PageModal from "@/components/common/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import S from "./styles.module.scss";
import { signIn } from "@/app/auth";
import { PropsWithChildren } from "react";

const LoginModal = ({ handleLogin }: { handleLogin: () => void }) => {
  const router = useRouter();

  return (
    <PageModal
      onClose={() => {
        router.back();
      }}
    >
      <div className={S.modalContainer}>
        <div className={S.mainTitle}>
          <h2 className={S.projectName}>슬 직 생</h2>
          <p className={S.projectSubName}>슬기로운 직장 생활</p>
        </div>
        <div className={S.loginType}>
          <button
            className={`${S.loginBtn} ${S.kakao}`}
            onClick={() => handleLogin()}
          >
            카카오로 시작하기
          </button>
          {/* <Link
            className={`${S.loginBtn} ${S.kakao}`}
            href="https://api.worklife.run/oauth/kakao"
            replace
          >
            KAKAO
          </Link> */}
        </div>
      </div>
    </PageModal>
  );
};

export default LoginModal;
