/*
  Warnings:

  - You are about to drop the column `name` on the `Vehicule` table. All the data in the column will be lost.
  - You are about to drop the column `range` on the `Vehicule` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Vehicule` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Vehicule` table. All the data in the column will be lost.
  - Added the required column `Name` to the `Vehicule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Miles_per_Gallon` to the `Vehicule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Horsepower` to the `Vehicule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Weight_in_lbs` to the `Vehicule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Acceleration` to the `Vehicule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Year` to the `Vehicule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicule" DROP COLUMN "name",
DROP COLUMN "range",
DROP COLUMN "type",
DROP COLUMN "year",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Miles_per_Gallon" INTEGER NOT NULL,
ADD COLUMN     "Horsepower" INTEGER NOT NULL,
ADD COLUMN     "Weight_in_lbs" INTEGER NOT NULL,
ADD COLUMN     "Acceleration" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "Year" TEXT NOT NULL;
