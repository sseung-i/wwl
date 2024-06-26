"use client";

import useUserStore from "@/store/user";
import { clientCookies } from "@/utils/cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LoginoutBtn = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLogined = useUserStore((state) => state.isLogined);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    clientCookies.delete("accessToken");
    logout();
    router.push("/login");
  };
  return pathname === "/login" ? (
    <></>
  ) : isLogined ? (
    <button onClick={handleLogout}>로그아웃</button>
  ) : (
    <Link href="/login">로그인</Link>
  );
};

export default LoginoutBtn;
