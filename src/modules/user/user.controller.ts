import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import { pagination } from '../../utils/pagination';
import pick from '../../utils/pick';
import { agencyFilterOptons, tourPlanFilterOptions } from './user.constant';

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

const getTourPlans = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, tourPlanFilterOptions);
  const result = await userService.getTourPlans(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const getAgencyById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.getAgencyById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const getTourPlanById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.getTourPlanById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan retrieved successfylly',
    data: result,
  });
});

const getUpcomingSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUpcomingSchedules(req?.user?.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Upcoming Schedules retrieved successfully',
    data: result,
  });
});

const manageBookings = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userService.manageBookings(id, req?.user?.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Upcoming Schedules retrieved successfully',
    data: result,
  });
});

export const userController = {
  getTourPlanById,
  bookPlan,
  getplansAndAgencies,
  getAgencies,
  getTourPlans,
  getAgencyById,
  getUpcomingSchedules,
  manageBookings,
};
