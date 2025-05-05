/*
  Warnings:

  - The `resetTokenExpireAt` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "resetToken" DROP NOT NULL,
ALTER COLUMN "resetToken" DROP DEFAULT,
DROP COLUMN "resetTokenExpireAt",
ADD COLUMN     "resetTokenExpireAt" TIMESTAMP(3);
