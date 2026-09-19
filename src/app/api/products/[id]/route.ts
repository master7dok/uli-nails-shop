import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = store.getProductById(id) || store.getProductBySlug(id);
  if (!product) {
    return NextResponse.json({ error: "Товар не знайдено" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = store.saveProduct({ ...body, id });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  store.deleteProduct(id);
  return NextResponse.json({ success: true });
}
