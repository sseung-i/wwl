"use client";

import Link from "next/link";
import S from "./styles.module.scss";

const LoginBtn = () => {
  return (
    <Link
      href="https://api.worklife.run/oauth/kakao"
      replace
      className={S.btnWrap}
    >
      카카오
    </Link>
  );
};

export default LoginBtn;
