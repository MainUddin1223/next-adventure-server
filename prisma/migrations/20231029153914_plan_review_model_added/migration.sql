-- CreateTable
CREATE TABLE "PlanReviews" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanReviews" ADD CONSTRAINT "PlanReviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanReviews" ADD CONSTRAINT "PlanReviews_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanReviews" ADD CONSTRAINT "PlanReviews_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "BookingHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
