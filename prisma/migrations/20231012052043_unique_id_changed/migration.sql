/*
  Warnings:

  - The primary key for the `BookingHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BookingHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PayoutHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PayoutHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Plans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Plans` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `plan_id` to the `BookingHistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `BookingHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `plan_id` on the `PayoutHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `agency_id` on the `PayoutHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `agency_id` on the `Plans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BookingHistory" DROP CONSTRAINT "BookingHistory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PayoutHistory" DROP CONSTRAINT "PayoutHistory_agency_id_fkey";

-- DropForeignKey
ALTER TABLE "PayoutHistory" DROP CONSTRAINT "PayoutHistory_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "Plans" DROP CONSTRAINT "Plans_agency_id_fkey";

-- AlterTable
ALTER TABLE "BookingHistory" DROP CONSTRAINT "BookingHistory_pkey",
ADD COLUMN     "plan_id" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "BookingHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PayoutHistory" DROP CONSTRAINT "PayoutHistory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "plan_id",
ADD COLUMN     "plan_id" INTEGER NOT NULL,
DROP COLUMN "agency_id",
ADD COLUMN     "agency_id" INTEGER NOT NULL,
ADD CONSTRAINT "PayoutHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Plans" DROP CONSTRAINT "Plans_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "agency_id",
ADD COLUMN     "agency_id" INTEGER NOT NULL,
ADD CONSTRAINT "Plans_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Plans" ADD CONSTRAINT "Plans_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutHistory" ADD CONSTRAINT "PayoutHistory_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutHistory" ADD CONSTRAINT "PayoutHistory_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
