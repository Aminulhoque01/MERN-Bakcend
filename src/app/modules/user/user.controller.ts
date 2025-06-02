import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const signUser = catchAsync(async (req: Request, res: Response) => {
  const { username, password, shops } = req.body;
  if (!username || !password || !shops) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
  }
  if (shops.length < 3) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "At least 3 shops are required"
    );
  }

  const user = await UserService.singUser(username, password, shops);

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "user singup sessfully",
    data: user,
  });
});

const LoginUser = catchAsync(async (req: Request, res: Response) => {
  const { username, password, rememberMe } = req.body;
  if (!username || !password) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid input");
  }

  const { user, token } = await UserService.LoginUser(
    username,
    password,
    rememberMe
  );

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "user login sessfully",
    data: { user, token },
  });
});

const profile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated");
  }

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "User profile fetched successfully",
    data: user,
  });
});

export const UserController = {
  signUser,
  LoginUser,
  profile,
};
