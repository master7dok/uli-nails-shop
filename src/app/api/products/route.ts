import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const hit = searchParams.get("hit");
  const q = searchParams.get("q");

  let products = store.getProducts();

  if (category) {
    const cat = store.getCategoryBySlug(category);
    if (cat) {
      products = products.filter((p) => p.categoryId === cat.id);
    }
  }

  if (subCategory) {
    const allCats = store.getCategories();
    let subId: string | undefined;
    for (const c of allCats) {
      const foundSub = c.subCategories.find((s) => s.slug === subCategory);
      if (foundSub) {
        subId = foundSub.id;
        break;
      }
    }
    if (subId) {
      products = products.filter((p) => p.subCategoryId === subId);
    }
  }

  if (hit === "true") {
    products = products.filter((p) => p.isHit);
  }

  if (q) {
    const lower = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.titleUa.toLowerCase().includes(lower) ||
        p.titlePl.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower)
    );
  }

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProduct = store.saveProduct({
      ...data,
      id: data.id || `prod-${Date.now()}`,
    });
    return NextResponse.json(newProduct);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
