import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const reviews = store.getAllReviews();
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  try {
    const { productId, authorName, rating, comment } = await req.json();
    const review = store.addReview(productId, {
      productId,
      authorName,
      rating,
      comment,
    });
    return NextResponse.json(review);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json();
    if (action === "approve") {
      store.approveReview(id);
      return NextResponse.json({ success: true });
    } else if (action === "delete") {
      store.deleteReview(id);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
