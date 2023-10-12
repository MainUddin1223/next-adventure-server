import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();

const createToken = async (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
  refresh_secret: string,
  refresh_time: string
): Promise<string> => {
  const refreshToke = jwt.sign(payload, refresh_secret, {
    expiresIn: refresh_time,
  });
  await prisma.users.update({
    where: {
      id: payload.userId as number,
    },
    data: {
      refresh_token: refreshToke,
    },
  });
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
