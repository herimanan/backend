/*
  Warnings:

  - You are about to drop the column `mail` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[email]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.mail_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "mail",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
