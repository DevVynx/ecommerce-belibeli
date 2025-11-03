import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./verifyToken";

export async function guardApi(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/api/cartItem"];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  try {
    if (!isProtectedPath) return NextResponse.next();

    const token = req.cookies.get("accessToken");
    const { userId } = await verifyToken(token?.value);
    const response = NextResponse.next();
    response.headers.set("x-userID", JSON.stringify(userId));
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Acesso não autorizado" }, { status: 401 });
  }
}
