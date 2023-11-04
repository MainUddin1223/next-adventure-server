/*
  Warnings:

  - The values [cenceled] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('pending', 'booked', 'canceled', 'rejected', 'completed');
ALTER TABLE "BookingHistory" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BookingHistory" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "BookingStatus_old";
ALTER TABLE "BookingHistory" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;
