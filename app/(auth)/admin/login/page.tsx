import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifySessionValue } from "@/lib/auth";
import LoginForm from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = cookies().get(COOKIE_NAME)?.value;
  if (await verifySessionValue(session)) {
    redirect("/admin");
  }

  const next =
    searchParams.next?.startsWith("/admin") &&
    !searchParams.next.startsWith("//")
      ? searchParams.next
      : "/admin";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-sm border border-slate-800 rounded-2xl bg-slate-900/60 p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-1">لوحة التحكم</h1>
        <p className="text-slate-400 text-sm mb-6">سجّل الدخول للمتابعة</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
