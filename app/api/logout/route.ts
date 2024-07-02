import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  return new NextResponse(null, { status: 200 });
}
