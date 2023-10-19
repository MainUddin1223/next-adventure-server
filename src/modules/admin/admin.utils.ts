import { PrismaClient } from '@prisma/client';
import { IMetaData } from '../agency/agency.type';
import { IFilterOption } from '../../types';

const prisma = new PrismaClient();

export const commonGetAllUserQuery = async (
  meta: IMetaData,
  filterOptions: IFilterOption,
  role: 'user' | 'admin' | 'agency'
) => {
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

  console.log(meta);
  const result = await prisma.users.findMany({
    skip,
    take,
    orderBy,
    where: {
      ...queryOption,
      role,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      contact_no: true,
      profile_img: true,
      rating: true,
      is_featured: true,
      about_user: true,
      createdAt: true,
      updatedAt: true,
      plans: true,
      booking_history: true,
      payout_history: true,
    },
  });

  const totalCount = await prisma.users.count({
    where: {
      role,
    },
  });

  const totalPage = totalCount > take ? totalCount / Number(take) : 1;
  return {
    result,
    meta: { page: page, size: take, total: totalCount, totalPage },
  };
};
