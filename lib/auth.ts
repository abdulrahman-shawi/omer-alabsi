// أدوات جلسة الدخول — تعمل في الوسيط (Edge) وفي الخادم
// لأنها تعتمد على Web Crypto فقط (لا استيرادات من node:crypto)

export const COOKIE_NAME = "admin_session";
const SESSION_DAYS = 7;

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "";
}

async function hmacHex(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// مقارنة بزمن ثابت لتجنب هجمات التوقيت
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// توليد قيمة الجلسة: "انتهاء الصلاحية.التوقيع"
export async function createSessionValue(): Promise<string> {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const sig = await hmacHex(String(exp));
  return `${exp}.${sig}`;
}

export async function verifySessionValue(
  value: string | undefined
): Promise<boolean> {
  if (!value || !getSecret()) return false;
  const [expStr, sig] = value.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmacHex(expStr);
  return safeEqual(expected, sig);
}

// التحقق من بيانات الدخول (تُقرأ من متغيرات البيئة)
export function checkCredentials(
  username: string,
  password: string
): boolean {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  if (!u || !p) return false;
  return safeEqual(username, u) && safeEqual(password, p);
}
