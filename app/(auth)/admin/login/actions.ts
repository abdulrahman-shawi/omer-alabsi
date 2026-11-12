"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  createSessionValue,
  COOKIE_NAME,
} from "@/lib/auth";

export type LoginState = { error?: string };

// منع التحويل الخارجي الضار عبر next
function safeNext(next: string): string {
  return next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

export async function login(
  prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/admin"));

  if (!checkCredentials(username, password)) {
    return { error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
  }

  const value = await createSessionValue();
  cookies().set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(next);
}
