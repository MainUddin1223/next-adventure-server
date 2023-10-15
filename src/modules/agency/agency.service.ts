import { PrismaClient } from '@prisma/client';
import { ICreatePlanData, IMetaData } from './agency.type';
import { IFilterOption } from '../../types';
import { getPlanByRoleQuery } from './agency.utils';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

const createPlan = async (data: ICreatePlanData) => {
  const result = await prisma.plans.create({
    data,
  });
  return result;
};

const getPlans = async (
  meta: IMetaData,
  filterOptions: IFilterOption,
  endUser: JwtPayload | null
) => {
  const { skip, take, orderBy } = meta;
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

  const userQueries = getPlanByRoleQuery(endUser, queryOption);

  const result = await prisma.plans.findMany({
    skip: Number(skip),
    take,
    orderBy,
    ...userQueries,
  });
  const totalCount =
    endUser?.role === 'agency'
      ? await prisma.plans.count({
          where: { agency_id: endUser.userId as number },
        })
      : await prisma.plans.count();
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: skip + 1, size: take, total: totalCount, totalPage },
  };
};

const getTourPlanById = async (id: number, user: JwtPayload | null) => {
  console.log(id, user);
  if (user && user?.role == 'agency') {
    const result = await prisma.plans.findFirst({
      where: {
        id,
        agency_id: user.userId,
      },
      include: {
        Payout_history: true,
        booking_history: true,
      },
    });
    return result;
  }
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

const updateTourPlan = async (data: Partial<ICreatePlanData>, id: number) => {
  const result = await prisma.plans.update({
    where: {
      id: data.id,
      agency_id: id,
    },
    data,
  });
  return result;
};

const deleteTourPlan = async (plan_id: number, agency_id: number) => {
  const planBooked = await prisma.bookingHistory.count({
    where: {
      plan_id,
    },
  });
  if (planBooked > 0) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Your tour plan already booked by user.So you can not delete this plan'
    );
  }
  const result = await prisma.plans.delete({
    where: {
      id: plan_id,
      agency_id,
    },
  });
  return result;
};

export const agencyService = {
  createPlan,
  getPlans,
  getTourPlanById,
  updateTourPlan,
  deleteTourPlan,
};
