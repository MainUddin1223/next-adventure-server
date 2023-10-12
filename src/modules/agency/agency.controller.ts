import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import { agencyService } from './agency.service';
import { createPlanSchema } from './agency.validate';
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
      message: 'Registration successful',
      data: result,
    });
  }
});
const getTourPlans = catchAsync(async (req: Request, res: Response) => {
  // const { error } = await createPlanSchema.validate(req.body);
  // if (error) {
  //     sendResponse(res, {
  //         statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
  //         success: false,
  //         message: 'Fail to create plan',
  //         data: error.details
  //     })
  // }
  const paginationOptions = await pagination(req.query);
  const filter = pick(req.query, planFilters);

  const result = await agencyService.getPlans(
    paginationOptions,
    filter,
    req?.user
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successful',
    data: result,
  });
});

export const agencyController = { createPlan, getTourPlans };
