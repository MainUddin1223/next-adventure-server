/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import ApiError from '../errorHandlers/apiError';
import { IGenericMessages } from '../interfaces/error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('----------------globalError-----------', err)
    : console.log(err);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericMessages[] = [];
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
