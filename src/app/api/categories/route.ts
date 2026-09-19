import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const categories = store.getCategories();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newCategory = store.saveCategory({
      ...data,
      id: data.id || `cat-${Date.now()}`,
      subCategories: data.subCategories || [],
    });
    return NextResponse.json(newCategory);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
