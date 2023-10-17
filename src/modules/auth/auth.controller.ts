import { Request, Response } from 'express';
import catchAsync from '../../errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/sendRespnse';
import { StatusCodes } from 'http-status-codes';
import {
  signUpValidateSchema,
  signinValidateSchema,
  validateUpdateSchema,
} from './auth.validation';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signUpValidateSchema.validate(req.body);
  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Registration failed',
      data: error.details,
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Confirm password mismatch!',
      data: '',
    });
  } else {
    delete req.body.confirmPassword;
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

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const { error } = await validateUpdateSchema.validate(req.body);
  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
      success: false,
      message: 'Registration failed',
      data: error.details,
    });
  } else {
    const result = await authService.getProfile(userId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Profile fatched successfully',
      data: result,
    });
  }
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await authService.updateProfile(req.body, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile fatched successfully',
    data: result,
  });
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

export const authController = {
  signUp,
  signin,
  signOut,
  getProfile,
  updateProfile,
};
