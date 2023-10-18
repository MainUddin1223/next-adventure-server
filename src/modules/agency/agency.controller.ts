import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import { agencyService } from './agency.service';
import { createPlanSchema, updatePlanSchema } from './agency.validate';
import { pagination } from '../../utils/pagination';
import pick from '../../utils/pick';
import { planFilters } from './agency.constants';

const createPlan = catchAsync(async (req: Request, res: Response) => {
  const { error } = await createPlanSchema.validate(req.body);
  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Fail to create plan',
      data: error.details,
    });
  } else {
    const planPayload = { ...req.body, agency_id: req?.user?.userId };
    const result = await agencyService.createPlan(planPayload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Plan created successfully',
      data: result,
    });
  }
});

const getTourPlans = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, planFilters);

  const result = await agencyService.getPlans(
    paginationOptions,
    filter,
    req?.user?.userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plans fetched successfully',
    data: result,
  });
});

const getTourPlanById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await agencyService.getTourPlanById(id, req.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan retrieved successfylly',
    data: result,
  });
});

const updateTourPlan = catchAsync(async (req: Request, res: Response) => {
  const { error } = await updatePlanSchema.validate(req.body);
  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Fail to update the plan',
      data: error.details,
    });
  } else {
    const id = Number(req.params.id);
    const result = await agencyService.updateTourPlan(
      { ...req.body, id },
      req?.user?.userId
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Plan updated successfylly',
      data: result,
    });
  }
});

const deleteTourPlan = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await agencyService.deleteTourPlan(id, req?.user?.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan deleted successfylly',
    data: result,
  });
});

const getBookingHistoryById = catchAsync(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const result = await agencyService.getBookingHistoryById(
      id,
      req?.user?.userId
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Plan booking fetched successfully',
      data: result,
    });
  }
);
type IUpdateBookingStatus = {
  agencyId: number;
  bookingHistoryId: number;
  status: 'booked' | 'rejected';
};

const manageBookings = catchAsync(async (req: Request, res: Response) => {
  const bookingHistoryId = Number(req.params.id);
  const agencyId: number = req?.user?.userId;
  const status: 'booked' | 'rejected' = req.body.status;
  const payload: IUpdateBookingStatus = { agencyId, bookingHistoryId, status };

  const result = await agencyService.manageBookings(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan booking fetched successfully',
    data: result,
  });
});

export const agencyController = {
  createPlan,
  getTourPlans,
  getTourPlanById,
  updateTourPlan,
  deleteTourPlan,
  getBookingHistoryById,
  manageBookings,
};
