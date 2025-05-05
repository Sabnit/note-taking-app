-- AlterTable
ALTER TABLE "users" ADD COLUMN     "resetToken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "resetTokenExpireAt" INTEGER NOT NULL DEFAULT 0;
