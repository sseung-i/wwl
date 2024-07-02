import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/login";

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/slackticon", request.url));
  }

  if (isLoginPage) {
    const queryParams = request.nextUrl.searchParams;
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");

    if (accessToken && refreshToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
      });
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
      });

      return response;
    }
  }

  // 로그인페이지도 아니고, 비회원은 볼 수 없는 페이지고, 쿠키도 없는 상태라면 -> 로그인으로
  // if (!isLoginPage && !isPassAuth(pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
