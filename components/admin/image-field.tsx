"use client";

import { useRef, useState } from "react";
import { inputCls } from "@/components/admin/ui";

// حقل صورة مع زر رفع من الجهاز (لابتوب أو موبايل) — يخزّن في Vercel Blob
export default function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "فشل رفع الصورة، حاول مجدداً");
      }
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل رفع الصورة");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const showPreview = /^(\/|https?:\/\/)/.test(value);

  return (
    <div className="space-y-1.5">
      <span className="block text-sm text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="ltr"
          placeholder="/gallery/photo.jpg أو https://..."
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="shrink-0 px-3 py-2 rounded-lg border border-slate-700 text-slate-300 text-sm hover:border-sky-500 hover:text-sky-400 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? "جارٍ الرفع..." : "رفع صورة"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {!error && showPreview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-20 rounded-lg border border-slate-800 object-cover"
        />
      )}
    </div>
  );
}
