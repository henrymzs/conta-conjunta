/*
  Warnings:

  - You are about to drop the column `telefone` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `telegramId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Usuario_telefone_key";

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "telefone",
ADD COLUMN     "telegramId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telegramId_key" ON "public"."Usuario"("telegramId");
