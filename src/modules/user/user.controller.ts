import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import { pagination } from '../../utils/pagination';
import pick from '../../utils/pick';
import { agencyFilterOptons, tourPlanFilterOptions } from './user.constant';
import { bookingHistoryFilterOptions } from '../admin/admin.constant';
import { reviewSchema } from './user.validator';
import ApiError from '../../errorHandlers/apiError';

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

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, bookingHistoryFilterOptions);
  const result = await userService.getAllBookings(
    paginationOptions,
    filter,
    req?.user?.userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const leaveReview = catchAsync(async (req: Request, res: Response) => {
  const { error } = await reviewSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, 'Inavlid Input');
  }
  const result = await userService.leaveReview(req?.user?.userId, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Your review submitted successfully',
    data: result,
  });
});

const reviewPlan = catchAsync(async (req: Request, res: Response) => {
  const booking_id = Number(req.params.id);
  // const { error } = await reviewSchema.validate(req.body);
  // if (error) {
  //   throw new ApiError(400, 'Inavlid Input');
  // }
  const payload = { ...req.body, user_id: req?.user?.userId, booking_id };
  const result = await userService.reviewPlan(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Your review submitted successfully',
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
  getAllBookings,
  leaveReview,
  reviewPlan,
};
