import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? "",
      // فشل سريع عند سقوط الاتصال بدل انتظار طويل
      connectionTimeoutMillis: 5000,
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// التحقق من إمكانية الاتصال بقاعدة البيانات (تُستخدم لعرض حالة واضحة في لوحة التحكم)
export async function dbAvailable(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
