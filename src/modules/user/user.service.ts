import { PrismaClient } from '@prisma/client';
import ApiError from '../../errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { IMetaData } from '../agency/agency.type';
import { IFilterOption } from '../../types';

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
//!Need to be fixed
const getAgencies = async (meta: IMetaData, filterOptions: IFilterOption) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          first_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          last_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }

  const result = await prisma.users.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
      role: 'agency',
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      profile_img: true,
    },
  });

  const totalCount = await prisma.users.count({
    where: {
      role: 'agency',
    },
  });

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getTourPlans = async (meta: IMetaData, filterOptions: IFilterOption) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          first_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          last_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }

  const result = await prisma.users.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
      role: 'agency',
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      profile_img: true,
    },
  });

  const totalCount = await prisma.users.count({
    where: {
      role: 'agency',
    },
  });

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

export const userService = {
  bookTourPlan,
  getTourPlanAndAgency,
  getAgencies,
  getTourPlans,
};
