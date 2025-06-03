import { PrismaClient } from "@/generated/prisma";
declare global {
    namespace globalThis{
        // eslint-disable-next-line no-var
        var prismadb: PrismaClient ;
    }
}
