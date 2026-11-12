"use client";

import { logout } from "@/app/admin/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-xs text-slate-500 hover:text-red-400 transition-colors"
      >
        تسجيل الخروج
      </button>
    </form>
  );
}
