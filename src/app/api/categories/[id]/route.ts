import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  store.deleteCategory(id);
  return NextResponse.json({ success: true });
}
