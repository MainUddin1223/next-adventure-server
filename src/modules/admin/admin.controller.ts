import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { pagination } from '../../utils/pagination';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../utils/pick';
import { agencyFilterOptons } from '../user/user.constant';
import { adminService } from './admin.service';
import { bookingHistoryFilterOptions } from './admin.constant';

const getAgencies = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, agencyFilterOptons);
  const result = await adminService.getAllAgencies(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const getTourPlans = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, agencyFilterOptons);
  const result = await adminService.getPayouts(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, bookingHistoryFilterOptions);
  const result = await adminService.getAllBookings(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const getPayouts = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, bookingHistoryFilterOptions);
  const result = await adminService.getPayouts(paginationOptions, filter);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const relaseAgencyPayout = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await adminService.relaseAgencyPayout(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

export const adminController = {
  getAgencies,
  getTourPlans,
  getAllBookings,
  getPayouts,
  relaseAgencyPayout,
};
