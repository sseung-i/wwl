import { cookies } from "next/headers";

export async function POST() {
  const token = cookies().get("authjs.csrf-token");

  console.log("token ::", token);

  const response = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token || ""}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  console.log("response ::", response);
}
