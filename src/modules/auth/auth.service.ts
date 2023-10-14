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
  const data = { ...payload, password: hash };
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
  if (data.role === 'admin') {
    const userData = await authUtils.getAdminData(result.id);
    return { result: userData, accessToken };
  }
  if (data.role === 'agency') {
    const userData = await authUtils.getAgencyData(result.id);
    return { result: userData, accessToken };
  } else {
    const userData = await authUtils.getUserData(result.id);
    return { result: userData, accessToken };
  }
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

export const authService = { createUser, signin, signOut };
