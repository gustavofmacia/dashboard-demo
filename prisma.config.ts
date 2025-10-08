import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

if (
  process.env.DB_USER &&
  process.env.DB_PASSWORD &&
  process.env.DB_HOST &&
  process.env.DB_PORT &&
  process.env.DB_NAME
) {
  process.env.DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
} else {
  throw new Error(
    "Faltan variables de entorno para la conexión de la base de datos."
  );
}

export default {
  schema: path.join("prisma"), // Prisma take schema.prisma + models/* --- https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema
} satisfies PrismaConfig;
