import { PrismaClient } from '@prisma/client';

let prismaInstance = null;

export function getPrismaInstance() {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
}
