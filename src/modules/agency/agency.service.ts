import { PrismaClient } from '@prisma/client';
import { ICreatePlanData } from './agency.type';
import { IFilterOption } from '../../types';
import { getPlanByRoleQuery } from './agency.utils';

const prisma = new PrismaClient();

const createPlan = async (data: ICreatePlanData) => {
  const result = await prisma.plans.create({
    data,
  });
  return result;
};
const getPlans = async (
  meta: any,
  filterOptions: IFilterOption,
  endUser: any
) => {
  const { skip, take, orderBy } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, maxPrice, minPrice, ...restOptions } = filterOptions;

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
    if (maxPrice || minPrice) {
      if (maxPrice) {
        const price = { lte: maxPrice };
        queryOption['price'] = price;
      }
      if (minPrice) {
        const price = { gte: minPrice };
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
      ? await prisma.plans.count({ where: { agency_id: endUser.userId } })
      : await prisma.plans.count();
  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: skip + 1, size: take, total: totalCount, totalPage },
  };
};

export const agencyService = { createPlan, getPlans };
