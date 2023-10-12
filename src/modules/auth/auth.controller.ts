import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import { signUpValidateSchema, signinValidateSchema } from './auth.validation';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signUpValidateSchema.validate(req.body);
  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Registration failed',
      data: error.details,
    });
  } else {
    const result = await authService.createUser(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Registration successful',
      data: result,
    });
  }
});

const signin = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signinValidateSchema.validate(req.body);
  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Registration failed',
      data: error.details,
    });
  } else {
    const result = await authService.signin(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Successfully sign in',
      data: result,
    });
  }
});

const signOut = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.signOut(req.user?.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successful',
    data: result,
  });
});

export const authController = { registerUser, signin, signOut };
