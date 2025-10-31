/*
  Warnings:

  - You are about to drop the column `langName` on the `Translation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId,name]` on the table `Lang` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Lang` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `langId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Translation" DROP CONSTRAINT "Translation_langName_fkey";

-- DropIndex
DROP INDEX "public"."Lang_name_key";

-- AlterTable
ALTER TABLE "Lang" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Lang_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "langName",
ADD COLUMN     "langId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lang_profileId_name_key" ON "Lang"("profileId", "name");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_langId_fkey" FOREIGN KEY ("langId") REFERENCES "Lang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
