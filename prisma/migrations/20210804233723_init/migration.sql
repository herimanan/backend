/*
  Warnings:

  - You are about to alter the column `Displacement` on the `Vehicule` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE "Vehicule" ALTER COLUMN "Displacement" DROP NOT NULL,
ALTER COLUMN "Displacement" SET DATA TYPE DECIMAL(65,30);
