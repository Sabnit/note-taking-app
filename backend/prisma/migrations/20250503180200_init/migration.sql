/*
  Warnings:

  - You are about to drop the column `content` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "content",
DROP COLUMN "isComplete",
ADD COLUMN     "description" TEXT;
