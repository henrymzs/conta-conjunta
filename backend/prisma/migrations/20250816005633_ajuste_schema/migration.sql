/*
  Warnings:

  - You are about to drop the column `email` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StatusPagamento" AS ENUM ('PENDENTE', 'CONFIRMADO');

-- CreateEnum
CREATE TYPE "public"."StatusNotificacao" AS ENUM ('PENDENTE', 'CONFIRMADO', 'FALHOU');

-- DropIndex
DROP INDEX "public"."Usuario_email_key";

-- DropIndex
DROP INDEX "public"."Usuario_email_telefone_key";

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "email",
ADD COLUMN     "nome" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Conta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "chave_pix" TEXT NOT NULL,
    "criador_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participante" (
    "id" TEXT NOT NULL,
    "conta_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "valor_dividido" DECIMAL(10,2) NOT NULL,
    "status" "public"."StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "data_pagamento" TIMESTAMP(3),

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notificacao" (
    "id" TEXT NOT NULL,
    "conta_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "status" "public"."StatusNotificacao" NOT NULL DEFAULT 'PENDENTE',
    "data_envio" TIMESTAMP(3),

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Conta" ADD CONSTRAINT "Conta_criador_id_fkey" FOREIGN KEY ("criador_id") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participante" ADD CONSTRAINT "Participante_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "public"."Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participante" ADD CONSTRAINT "Participante_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notificacao" ADD CONSTRAINT "Notificacao_conta_id_fkey" FOREIGN KEY ("conta_id") REFERENCES "public"."Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notificacao" ADD CONSTRAINT "Notificacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
