-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT,
ALTER COLUMN "roles" SET DEFAULT ARRAY['user']::TEXT[];
