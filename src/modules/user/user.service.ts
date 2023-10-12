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

export const userService = { bookTourPlan };
