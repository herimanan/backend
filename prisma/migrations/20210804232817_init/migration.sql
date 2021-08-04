/*
  Warnings:

  - Added the required column `Displacement` to the `Vehicule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicule" ADD COLUMN     "Displacement" INTEGER NOT NULL;
