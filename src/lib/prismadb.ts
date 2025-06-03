import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = global as unknown as { prismadb?: PrismaClient };

let client: PrismaClient;

if (process.env.NODE_ENV === "production") {
  client = new PrismaClient();
} else {
  if (!globalForPrisma.prismadb) {
    globalForPrisma.prismadb = new PrismaClient();
  }
  client = globalForPrisma.prismadb;
}

export default client;
