import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./verifyToken";

const protectedPaths = ["/cart", "/profile"];

export async function guardFront(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieData = await cookies();
  const token = cookieData.get("accessToken");
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  try {
    const { email, userId } = await verifyToken(token?.value);

    const response = NextResponse.next();
    response.headers.set("x-user", JSON.stringify({ userId, email }));

    return response;
  } catch (error) {
    if (!isProtected) return NextResponse.next();

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }
}
