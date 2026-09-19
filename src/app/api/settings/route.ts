import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const settings = store.getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const settings = store.updateSettings(data);
    return NextResponse.json(settings);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
