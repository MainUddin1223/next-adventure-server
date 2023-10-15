import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { agencyService } from '../agency/agency.service';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import { pagination } from '../../utils/pagination';
import pick from '../../utils/pick';
import { agencyFilterOptons } from './user.constant';

const getTourPlanById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await agencyService.getTourPlanById(id, null);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan retrieved successfully',
    data: result,
  });
});

const bookPlan = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    userId: req?.user?.userId,
    planId: req.body.planId,
    quantity: req.body.quantity,
  };
  const result = await userService.bookTourPlan(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan booked successfully',
    data: result,
  });
});

const getplansAndAgencies = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getTourPlanAndAgency();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const getAgencies = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, agencyFilterOptons);
  const result = await userService.getAgencies(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

export const userController = {
  getTourPlanById,
  bookPlan,
  getplansAndAgencies,
  getAgencies,
};
