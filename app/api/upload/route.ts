import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { COOKIE_NAME, verifySessionValue } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export async function POST(req: Request) {
  const session = cookies().get(COOKIE_NAME)?.value;
  if (!(await verifySessionValue(session))) {
    return NextResponse.json(
      { error: "جلسة غير صالحة، سجّل الدخول من جديد" },
      { status: 401 }
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "لم يتم استلام أي ملف" }, { status: 400 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "صيغة غير مدعومة — المسموح: JPG أو PNG أو WebP أو GIF أو AVIF" },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "حجم الصورة يجب أن يكون أقل من 10 ميغابايت" },
      { status: 400 }
    );
  }

  const name = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  try {
    const blob = await put(name, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    const raw = e instanceof Error ? e.message : "";
    const error = /BLOB_READ_WRITE_TOKEN|token/i.test(raw)
      ? "تخزين Vercel Blob غير مهيأ — أنشئ Blob store من لوحة Vercel واربطه بالمشروع"
      : "تعذر رفع الصورة، حاول مجدداً";
    return NextResponse.json({ error }, { status: 500 });
  }
}
