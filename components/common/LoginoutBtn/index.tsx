"use client";

import { clientCookies } from "@/utils/cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LoginoutBtn = ({ isLogined }: { isLogined: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    fetch("/api/logout", {
      method: "GET",
    }).then(() => router.push("/login"));
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
