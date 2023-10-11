import { Request, Response } from "express";
import catchAsync from "../../errorHandlers/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendRespnse";
import { StatusCodes } from "http-status-codes";

const registerUser = catchAsync(
    async (req: Request, res: Response) => {
        const result = await authService.createUser(req.body);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Registration successful',
            data: result
        })
    }
);

export const authController = { registerUser }