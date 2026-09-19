import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const banners = store.getBanners();
  return NextResponse.json(banners);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const banner = store.saveBanner({
      ...data,
      id: data.id || `banner-${Date.now()}`,
    });
    return NextResponse.json(banner);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    store.deleteBanner(id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
