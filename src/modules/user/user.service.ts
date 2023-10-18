import { PrismaClient } from '@prisma/client';
import ApiError from '../../errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { IMetaData } from '../agency/agency.type';
import { IFilterOption } from '../../types';
import { IBookPlanPayload } from './user.type';

const prisma = new PrismaClient();

const bookTourPlan = async (payload: IBookPlanPayload) => {
  //!Payment need to be implemented
  const { userId, planId, quantity } = payload;

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
    const { search, max_price, min_price, ...restOptions } = filterOptions;

    if (search) {
      queryOption['OR'] = [
        {
          plan_name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          starting_location: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (max_price || min_price) {
      if (max_price) {
        const price = { lte: max_price };
        queryOption['price'] = price;
      }
      if (min_price) {
        const price = { gte: min_price };
        queryOption['price'] = price;
      }
    }

    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }

  const result = await prisma.plans.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
    },
    select: {
      plan_name: true,
      id: true,
      starting_location: true,
      starting_time: true,
      images: true,
      price: true,
      users: {
        select: {
          first_name: true,
          last_name: true,
          id: true,
        },
      },
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

const getAgencyById = async (id: number) => {
  const result = await prisma.users.findFirst({
    where: {
      id,
      role: 'agency',
    },
    select: {
      first_name: true,
      last_name: true,
      contact_no: true,
      profile_img: true,
      rating: true,
      about_user: true,
      plans: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        select: {
          id: true,
          plan_name: true,
          images: true,
          price: true,
          starting_location: true,
        },
      },
    },
  });
  return result;
};

const getTourPlanById = async (id: number) => {
  const result = await prisma.plans.findUnique({
    where: {
      id,
    },
    select: {
      plan_name: true,
      id: true,
      starting_location: true,
      starting_time: true,
      price: true,
      tour_duration: true,
      cover_location: true,
      total_meals: true,
      description: true,
      booking_deadline: true,
      events: true,
      users: {
        select: {
          first_name: true,
          last_name: true,
          id: true,
          rating: true,
          profile_img: true,
        },
      },
    },
  });
  return result;
};

export const userService = {
  bookTourPlan,
  getTourPlanAndAgency,
  getAgencies,
  getTourPlans,
  getAgencyById,
  getTourPlanById,
};
