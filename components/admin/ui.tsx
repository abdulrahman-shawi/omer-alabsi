"use client";

import { ReactNode, useState } from "react";

export type SaveResult = { ok: boolean; error?: string };
export type SaveStatus = "idle" | "saving" | "saved" | "error";

// حالة الحفظ المشتركة بين كل النماذج
export function useSave() {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState("");

  async function run(fn: () => Promise<SaveResult>) {
    setStatus("saving");
    setError("");
    try {
      const res = await fn();
      if (res.ok) {
        setStatus("saved");
        window.setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
        setError(res.error ?? "فشل الحفظ، حاول مجدداً");
      }
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "خطأ غير متوقع");
    }
  }

  return { status, error, run };
}

export const inputCls =
  "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-sky-500 focus:outline-none transition-colors";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-slate-400 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export function Text({
  label,
  value,
  onChange,
  placeholder,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <Field label={label}>
      <input
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
      />
    </Field>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  dir?: "ltr" | "rtl";
}) {
  return (
    <Field label={label}>
      <textarea
        className={`${inputCls} leading-relaxed`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        dir={dir}
      />
    </Field>
  );
}

export function Num({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        className={inputCls}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Field>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Field label={label}>
      <select
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 group"
    >
      <span
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-sky-500" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
            checked ? "right-0.5" : "right-[22px]"
          }`}
        />
      </span>
      <span className="text-sm text-slate-300 group-hover:text-slate-100">
        {label}
      </span>
    </button>
  );
}

function IconBtn({
  onClick,
  disabled,
  title,
  danger,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`w-7 h-7 shrink-0 rounded border text-xs flex items-center justify-center transition-colors disabled:opacity-30 ${
        danger
          ? "border-red-900/60 text-red-400 hover:bg-red-950/60"
          : "border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-400"
      }`}
    >
      {children}
    </button>
  );
}

export function AddBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg border border-dashed border-slate-700 text-slate-400 text-sm hover:border-sky-500 hover:text-sky-400 transition-colors"
    >
      + {children}
    </button>
  );
}

// غلاف عنصر داخل قائمة متكررة مع أزرار الترتيب والحذف
export function Item({
  title,
  index,
  total,
  onUp,
  onDown,
  onRemove,
  children,
}: {
  title: string;
  index: number;
  total: number;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-slate-200 text-sm truncate">
          {title || `عنصر ${index + 1}`}
        </span>
        <div className="flex items-center gap-1.5">
          <IconBtn onClick={onUp} disabled={index === 0} title="نقل لأعلى">
            ↑
          </IconBtn>
          <IconBtn onClick={onDown} disabled={index === total - 1} title="نقل لأسفل">
            ↓
          </IconBtn>
          <IconBtn onClick={onRemove} title="حذف العنصر" danger>
            ✕
          </IconBtn>
        </div>
      </div>
      {children}
    </div>
  );
}

// محرر قائمة نصوص بسيطة (نقاط، مقررات، اهتمامات...)
export function StrList({
  items,
  onChange,
  addLabel,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className={inputCls}
            value={s}
            onChange={(e) =>
              onChange(items.map((x, j) => (j === i ? e.target.value : x)))
            }
          />
          <IconBtn
            danger
            title="حذف"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            ✕
          </IconBtn>
        </div>
      ))}
      <AddBtn onClick={() => onChange([...items, ""])}>{addLabel}</AddBtn>
    </div>
  );
}

export function SaveButton({ status, error }: { status: SaveStatus; error: string }) {
  return (
    <div className="flex items-center gap-4">
      {status === "saved" && (
        <span className="text-emerald-400 text-sm">✓ تم الحفظ بنجاح</span>
      )}
      {status === "error" && <span className="text-red-400 text-sm">{error}</span>}
      <button
        type="submit"
        disabled={status === "saving"}
        className="px-8 py-3 rounded-full bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 disabled:opacity-50 transition-colors shadow-lg shadow-sky-500/20"
      >
        {status === "saving" ? "جارٍ الحفظ..." : "حفظ التغييرات"}
      </button>
    </div>
  );
}

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-slate-800 rounded-2xl p-5 md:p-6 bg-slate-900/30 space-y-5">
      <h2 className="font-bold text-white border-r-2 border-sky-500 pr-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── مساعدات تحديث المصفوفات ──
export function setAt<T>(arr: T[], i: number, patch: Partial<T>): T[] {
  return arr.map((x, j) => (j === i ? { ...x, ...patch } : x));
}
export function moveUp<T>(arr: T[], i: number): T[] {
  if (i <= 0) return arr;
  return [...arr.slice(0, i - 1), arr[i], arr[i - 1], ...arr.slice(i + 1)];
}
export function moveDown<T>(arr: T[], i: number): T[] {
  if (i >= arr.length - 1) return arr;
  return [...arr.slice(0, i), arr[i + 1], arr[i], ...arr.slice(i + 2)];
}
