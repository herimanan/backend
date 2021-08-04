/*
  Warnings:

  - Added the required column `Origin` to the `Vehicule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicule" ADD COLUMN     "Origin" TEXT NOT NULL;
