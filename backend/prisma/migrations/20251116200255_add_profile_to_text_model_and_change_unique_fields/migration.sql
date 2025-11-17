/*
  Warnings:

  - A unique constraint covering the columns `[key,profileId]` on the table `Text` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Text` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `profileId` to the `Text` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Text" DROP CONSTRAINT "Text_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Translation" DROP CONSTRAINT "Translation_textKey_fkey";

-- DropIndex
DROP INDEX "public"."Text_key_key";

-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD CONSTRAINT "Text_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Text_key_profileId_key" ON "Text"("key", "profileId");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_textKey_fkey" FOREIGN KEY ("textKey") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
