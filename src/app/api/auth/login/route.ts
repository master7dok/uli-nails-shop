import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const success = await loginAdmin(password);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Невірний пароль адміністратора" }, { status: 401 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Помилка сервера" }, { status: 500 });
  }
}
