import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("prisma"), // Prisma take schema.prisma + models/* --- https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema
} satisfies PrismaConfig;
