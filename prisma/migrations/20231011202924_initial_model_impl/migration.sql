-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user', 'super_admin', 'agency');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'booked', 'cenceled', 'rejected');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('pending', 'paid', 'cenceled');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "contact_no" TEXT NOT NULL,
    "profile_img" TEXT NOT NULL,
    "refresh_token" TEXT,
    "rating" DECIMAL(10,1),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "about_user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "id" TEXT NOT NULL,
    "agency_id" TEXT NOT NULL,
    "plan_name" TEXT NOT NULL,
    "images" TEXT[],
    "starting_location" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "cover_location" TEXT[],
    "tour_duration" INTEGER NOT NULL,
    "starting_time" TIMESTAMP(3) NOT NULL,
    "total_meals" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "booking_deadline" TIMESTAMP(3) NOT NULL,
    "events" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingHistory" (
    "id" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "quantity" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayoutHistory" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "agency_id" TEXT NOT NULL,
    "status" "PayoutStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayoutHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plans" ADD CONSTRAINT "Plans_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutHistory" ADD CONSTRAINT "PayoutHistory_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutHistory" ADD CONSTRAINT "PayoutHistory_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
