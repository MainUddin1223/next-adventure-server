import { PrismaClient } from '@prisma/client';
import ApiError from '../../errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';

export type IBookPlanPayload = {
  userId: number;
  planId: number;
  quantity: number;
};

const prisma = new PrismaClient();

const bookTourPlan = async (payload: IBookPlanPayload) => {
  //!Payment need to be implemented
  const { userId, planId, quantity } = payload;
  console.log(payload);

  const getPlan = await prisma.plans.findFirst({
    where: {
      id: planId,
      booking_deadline: {
        gt: new Date(),
      },
    },
  });
  if (!getPlan) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Your reqested plan in not available'
    );
  }

  const calculateAmount = Number(getPlan.price) * quantity;
  const bookingData = {
    quantity,
    user_id: userId,
    plan_id: planId,
    total_amount: calculateAmount,
  };
  const createBooking = await prisma.bookingHistory.create({
    data: bookingData,
  });
  const insetIntoPayouts = await prisma.payoutHistory.create({
    data: {
      plan_id: planId,
      agency_id: getPlan.agency_id,
      amount: calculateAmount,
      quantity,
    },
  });
  console.log(insetIntoPayouts);
  return createBooking;
};

const getTourPlanAndAgency = async () => {
  const tourPlans = await prisma.plans.findMany({
    take: 5,

    select: {
      id: true,
      plan_name: true,
      images: true,
      price: true,
      starting_time: true,
      starting_location: true,
    },
  });
  const agencies = await prisma.users.findMany({
    take: 5,
    where: {
      role: 'agency',
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      profile_img: true,
    },
  });
  return { tourPlans, agencies };
};

export const userService = { bookTourPlan, getTourPlanAndAgency };
