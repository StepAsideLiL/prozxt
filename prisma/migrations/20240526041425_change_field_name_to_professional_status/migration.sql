/*
  Warnings:

  - You are about to drop the column `status` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "status";
ALTER TABLE "Profile" ADD COLUMN     "professionalStatus" STRING;
