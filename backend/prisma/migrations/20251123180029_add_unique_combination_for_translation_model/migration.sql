/*
  Warnings:

  - A unique constraint covering the columns `[textKey,langId]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translation_textKey_langId_key" ON "Translation"("textKey", "langId");
