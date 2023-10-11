import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { PrismaClient } from '@prisma/client';
import { jwtHelpers } from '../helpers/jwtHelpers';

const prisma = new PrismaClient();

const verifyAuthWithRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_access_secret as string
      );
      req.user = decoded;
      if (!decoded.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const isUserExist = await prisma.users.findUnique({
        where: {
          id: req?.user?.userId,
        },
      });

      if (!isUserExist || !allowedRoles.includes(req.user?.role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_access_secret as string
    );
    req.user = decoded;
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const isUserExist = await prisma.users.findUnique({
      where: {
        id: req?.user?.userId,
      },
    });
    if (!isUserExist) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const verifyAdmin = verifyAuthWithRole(['admin', 'super_admin']);
const verifySuperAmdin = verifyAuthWithRole(['super_admin']);
const verifyUser = verifyAuthWithRole(['user']);
const verifyAgency = verifyAuthWithRole(['agency']);

export { verifyAdmin, verifyUser, verifyAuth, verifySuperAmdin, verifyAgency };
