-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STANDART', 'MAIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STANDART';
