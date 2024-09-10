import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./app/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/login";

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/slackticon", request.url));
  }

  if (isLoginPage) {
    const session = await auth();

    // console.log("==-=session", session?.user);

    // const queryParams = request.nextUrl.searchParams;
    // const accessToken = queryParams.get("accessToken");
    // const refreshToken = queryParams.get("refreshToken");

    // if (accessToken && refreshToken) {
    //   const response = NextResponse.redirect(new URL("/login", request.url));
    //   response.cookies.set("accessToken", accessToken, {
    //     // httpOnly: true,
    //   });
    //   response.cookies.set("refreshToken", refreshToken, {
    //     httpOnly: true,
    //   });

    //   return response;
    // }
  }

  const isPassAuth = (pathname: string) => {
    switch (pathname) {
      case "/":
      case "/slackticon":
      case "/slackticon/search":
      case "/mypage":
      case "/mypage/slackticon":
        return true;
      default:
        return false;
    }
  };

  // 로그인페이지도 아니고, 비회원은 볼 수 없는 페이지고, 쿠키도 없는 상태라면 -> 로그인으로
  if (!isLoginPage && !isPassAuth(pathname) && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
