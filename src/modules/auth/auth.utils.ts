import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserData = async (id: number) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      contact_no: true,
      about_user: true,
      profile_img: true,
      booking_history: true,
    },
  });
  return result;
};

const getAgencyData = async (id: number) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      contact_no: true,
      about_user: true,
      profile_img: true,
      is_featured: true,
      rating: true,
      payout_history: true,
      plans: {
        include: {
          booking_history: true,
        },
      },
    },
  });
  return result;
};
const getAdminData = async (id: number) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
      contact_no: true,
      about_user: true,
      profile_img: true,
      booking_history: true,
    },
  });
  return result;
};

export const authUtils = { getUserData, getAgencyData, getAdminData };
