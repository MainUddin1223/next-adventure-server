import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ILoginPayload, IRegisterPayload } from './auth.type';
import ApiError from '../../errorHandlers/apiError';
import httpStatus from 'http-status';
import { StatusCodes } from 'http-status-codes';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { authUtils } from './auth.utils';

const prisma = new PrismaClient();

const createUser = async (payload: IRegisterPayload) => {
  const hash = bcrypt.hashSync(payload.password, 10);
  const data = { ...payload, password: hash, role: 'super_admin' };
  console.log(data);
  const result = await prisma.users.create({
    data,
  });
  const accessData = { role: result.role, userId: result.id };
  const accessToken = await jwtHelpers.createToken(
    accessData,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );
  const userData = await authUtils.getUserData(result.id);
  return { result: userData, accessToken };
};

const registerAgency = async (payload: IRegisterPayload) => {
  const hash = bcrypt.hashSync(payload.password, 10);
  const data = { ...payload, password: hash };
  const result = await prisma.users.create({
    data: { ...data, role: 'agency' },
  });
  const accessData = { role: result.role, userId: result.id };
  const accessToken = await jwtHelpers.createToken(
    accessData,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );
  const userData = await authUtils.getAgencyData(result.id);
  return { result: userData, accessToken };
};

const signin = async (data: ILoginPayload) => {
  const isUserExist = await prisma.users.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    data.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }

  const payload = { role: isUserExist.role, userId: isUserExist.id };
  const accessToken = await jwtHelpers.createToken(
    payload,
    config.jwt.jwt_access_secret as string,
    config.jwt.expires_in as string,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  if (isUserExist.role === 'admin' || isUserExist.role === 'super_admin') {
    const userData = await authUtils.getAdminData(isUserExist.id);
    return { result: userData, accessToken };
  } else if (isUserExist.role === 'agency') {
    const userData = await authUtils.getAgencyData(isUserExist.id);
    return { result: userData, accessToken };
  } else {
    const userData = await authUtils.getUserData(isUserExist.id);
    return { result: userData, accessToken };
  }
};

const signOut = async (id: number) => {
  await prisma.users.update({
    where: {
      id,
    },
    data: {
      refresh_token: null,
    },
  });
  return { message: 'Succssfully logout' };
};

const getProfile = async (id: number) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      first_name: true,
      last_name: true,
      profile_img: true,
      email: true,
      about_user: true,
      contact_no: true,
    },
  });
  return result;
};

type IUploadData = {
  first_name?: string;
  last_name?: string;
  contact_no?: string;
  about_user?: string;
  profile_img?: string;
};

const updateProfile = async (data: IUploadData, id: number) => {
  const result = await prisma.users.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const authService = {
  createUser,
  signin,
  signOut,
  getProfile,
  updateProfile,
  registerAgency,
};
