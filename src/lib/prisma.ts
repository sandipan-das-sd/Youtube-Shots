import { PrismaClient } from "@/generated/prisma";



// Use a single instance of PrismaClient across the app
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;