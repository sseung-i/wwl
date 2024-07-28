"use client";

import { clientCookies } from "@/utils/cookie";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "../Modal";

const LoginoutBtn = ({ isLogined }: { isLogined: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Modal.confirm({
      title: "로그아웃",
      content: "로그아웃 하시겠습니까?",
      onConfirm: () => {
        signOut();
        clientCookies.delete("accessToken");
        clientCookies.delete("refreshToken");
      },
    });
  };
  return pathname === "/login" ? (
    <></>
  ) : isLogined ? (
    <button onClick={() => handleLogout()}>로그아웃</button>
  ) : (
    <Link href="/login">로그인</Link>
  );
};

export default LoginoutBtn;
