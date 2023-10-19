import { PrismaClient } from '@prisma/client';
import { IMetaData } from '../agency/agency.type';
import { IFilterOption } from '../../types';
import { GroupedPayout } from './admin.type';
import { commonGetAllUserQuery } from './admin.utils';
import ApiError from '../../errorHandlers/apiError';

const prisma = new PrismaClient();

const getAllAdmins = async (meta: IMetaData, filterOptions: IFilterOption) => {
  const result = await commonGetAllUserQuery(meta, filterOptions, 'admin');
  return result;
};

const getAllUsers = async (meta: IMetaData, filterOptions: IFilterOption) => {
  console.log('service', meta);
  const result = await commonGetAllUserQuery(meta, filterOptions, 'user');
  return result;
};

const getAllAgencies = async (
  meta: IMetaData,
  filterOptions: IFilterOption
) => {
  const result = await commonGetAllUserQuery(meta, filterOptions, 'agency');
  return result;
};

const getAllTourPlan = async (
  meta: IMetaData,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;
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
      id: true,
      plan_name: true,
      starting_time: true,
      price: true,
      is_featured: true,
      booking_deadline: true,
      users: {
        select: {
          first_name: true,
          last_name: true,
          id: true,
          email: true,
        },
      },
    },
  });

  const totalCount = await prisma.plans.count({});

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getAllBookings = async (
  meta: IMetaData,
  filterOptions: IFilterOption
) => {
  const { skip, take, orderBy, page } = meta;
  const queryOption: { [key: string]: any } = {};

  if (Object.keys(filterOptions).length) {
    const { search, ...restOptions } = filterOptions;
    if (search) {
      queryOption['OR'] = [
        {
          plan: {
            plan_name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }
    Object.entries(restOptions).forEach(([field, value]) => {
      queryOption[field] = value;
    });
  }
  const result = await prisma.bookingHistory.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
    },
    select: {
      id: true,
      status: true,
      total_amount: true,
      quantity: true,
      createdAt: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
          id: true,
          email: true,
        },
      },
      plan: {
        select: {
          plan_name: true,
          booking_deadline: true,
        },
      },
    },
  });

  const totalCount = await prisma.bookingHistory.count({});

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const getPayouts = async (meta: IMetaData, filterOptions: IFilterOption) => {
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
  const agencies = await prisma.users.findMany({
    skip,
    take,
    orderBy,
    where: {
      role: 'agency',
      ...queryOption,
    },
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
      payout_history: {
        where: {
          plan: {
            booking_deadline: {
              gt: new Date(),
            },
          },
        },
        select: {
          plan_id: true,
          status: true,
          quantity: true,
          amount: true,
          plan: {
            select: {
              plan_name: true,
            },
          },
        },
      },
    },
  });

  const result = agencies.map(agency => {
    const payoutByStatus: { [status: string]: GroupedPayout } =
      agency.payout_history.reduce((acc: any, payout) => {
        const { status, quantity, amount } = payout;

        if (!acc[status]) {
          acc[status] = { status, totalQuantity: 0, totalAmount: 0 };
        }
        acc[status].totalQuantity += quantity;
        acc[status].totalAmount += Number(amount);

        return acc;
      }, {});

    return {
      ...agency,
      groupedPayouts: Object.values(payoutByStatus),
    };
  });

  const totalCount = await prisma.users.count({});

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};

const relaseAgencyPayout = async (id: number) => {
  const result = await prisma.payoutHistory.updateMany({
    where: {
      agency_id: id,
      status: {
        not: 'paid',
      },
    },
    data: {
      status: 'paid',
    },
  });
  if (result) {
    return 'Payout relased successfully';
  }
  return 'Payout failed';
};

const createAdmin = async (id: number, role: 'admin') => {
  const result = await prisma.users.update({
    where: {
      id,
      role: 'user',
    },
    data: {
      role,
    },
  });
  if (!result) {
    throw new ApiError(404, 'User not found');
  } else {
    return result;
  }
};

export const adminService = {
  getAllAgencies,
  getAllTourPlan,
  getAllBookings,
  getPayouts,
  relaseAgencyPayout,
  getAllAdmins,
  getAllUsers,
  createAdmin,
};
