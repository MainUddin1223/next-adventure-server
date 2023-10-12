/*
  Warnings:

  - Added the required column `amount` to the `PayoutHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `PayoutHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayoutHistory" ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
