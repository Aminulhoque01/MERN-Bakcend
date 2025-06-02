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



export const UserController = {
  signUser,
};
