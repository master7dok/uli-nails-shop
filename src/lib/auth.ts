import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "ulinail_admin_session";
const SESSION_SECRET = process.env.ADMIN_SECRET || "ulinail_luxury_secret_session_key_2025";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ulinail.com";

export function hashPassword(password: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(password).digest("hex");
}

export function createSessionToken(email: string): string {
  const payload = `${email}:${Date.now()}`;
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${signature}`).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, timestamp, signature] = decoded.split(":");
    if (!email || !timestamp || !signature) return false;

    // Check expiration (e.g. 7 days)
    const sessionTime = parseInt(timestamp, 10);
    const now = Date.now();
    if (now - sessionTime > 7 * 24 * 60 * 60 * 1000) return false;

    const expectedSig = crypto.createHmac("sha256", SESSION_SECRET).update(`${email}:${timestamp}`).digest("hex");
    return expectedSig === signature && email === ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function checkAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function loginAdmin(password: string): Promise<boolean> {
  if (password === ADMIN_PASSWORD) {
    const token = createSessionToken(ADMIN_EMAIL);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
