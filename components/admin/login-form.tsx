"use client";

import { useFormState } from "react-dom";
import { login, type LoginState } from "@/app/(auth)/admin/login/actions";

const inputCls =
  "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none transition-colors";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState<LoginState, FormData>(login, {
    error: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label
          htmlFor="username"
          className="block text-sm text-slate-400 mb-1.5"
        >
          اسم المستخدم
        </label>
        <input
          id="username"
          name="username"
          required
          autoComplete="username"
          dir="ltr"
          className={inputCls}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm text-slate-400 mb-1.5"
        >
          كلمة المرور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          dir="ltr"
          className={inputCls}
        />
      </div>

      {state.error && <p className="text-red-400 text-sm">{state.error}</p>}

      <button
        type="submit"
        className="w-full px-6 py-3 rounded-full bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
      >
        تسجيل الدخول
      </button>
    </form>
  );
}
