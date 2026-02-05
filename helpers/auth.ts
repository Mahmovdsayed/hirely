"use server";

import { verify } from "hono/jwt";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "";
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET environment variable");

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;

  try {
    await verify(token, JWT_SECRET, "HS256");
    return true;
  } catch {
    return false;
  }
}

export async function getDecodedToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const payload = await verify(token, JWT_SECRET, "HS256");
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
