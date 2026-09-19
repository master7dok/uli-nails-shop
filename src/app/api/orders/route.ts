import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const orders = store.getOrders();
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const order = store.createOrder(data);
    return NextResponse.json(order);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
