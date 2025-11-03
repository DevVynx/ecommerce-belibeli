import { NextResponse, type NextRequest } from "next/server";
import { cartService } from "./service";

export async function GET(req: NextRequest) {
  try {
    const { cart, count, items } = await cartService.get(req);

    return NextResponse.json({ cart, items, count });
  } catch (error) {
    return NextResponse.json({ count: 0, items: [] });
  }
}
