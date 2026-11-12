"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/lib/auth";

export async function logout() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  redirect("/admin/login");
}
