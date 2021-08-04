/*
  Warnings:

  - You are about to alter the column `Miles_per_Gallon` on the `Vehicule` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `Weight_in_lbs` on the `Vehicule` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- AlterTable
ALTER TABLE "Vehicule" ALTER COLUMN "Miles_per_Gallon" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "Weight_in_lbs" DROP NOT NULL,
ALTER COLUMN "Weight_in_lbs" SET DATA TYPE DECIMAL(65,30);
