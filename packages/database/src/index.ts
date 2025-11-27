import { PrismaClient, Prisma } from '../generated/prisma/client.js';

declare global {
	// allow global `__db_prisma__` to persist across module reloads in development
	// eslint-disable-next-line no-var
	var __db_prisma__: PrismaClient | undefined;
}

const prisma = globalThis.__db_prisma__ ?? new (PrismaClient as any)();

const nodeEnv = (globalThis as any).process?.env?.NODE_ENV;
if (nodeEnv !== 'production') globalThis.__db_prisma__ = prisma;

export default prisma;
export { PrismaClient, Prisma };


