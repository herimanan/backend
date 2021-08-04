/*
  Warnings:

  - Added the required column `Cylinders` to the `Vehicule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicule" ADD COLUMN     "Cylinders" INTEGER NOT NULL;
