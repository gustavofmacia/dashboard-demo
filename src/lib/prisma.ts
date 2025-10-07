import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

function getPrismaLog(): Array<"query" | "warn" | "error"> {
  // Configure PRISMA_LOG variable in .env
  if (process.env.NODE_ENV === "production") return ["error"];

  return process.env.PRISMA_LOG === "true"
    ? ["query", "warn", "error"]
    : ["error"];
}

const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: getPrismaLog(),
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
