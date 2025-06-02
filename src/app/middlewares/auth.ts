// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../modules/user/user.model";

// const JWT_SECRET = process.env.JWT_SECRET || "secret";

// export interface AuthRequest extends Request {
//   user: any;
// }

// export async function authenticateToken(
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Token required" });

//   try {
//     const payload: any = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(payload.id).select("-password");
//     if (!user) return res.status(401).json({ message: "Invalid token user" });
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Secret, TokenExpiredError } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelper } from "../../helpers/jwtHelper";
import { User } from "../modules/user/user.model";

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Step 1: Get Authorization Header
      const tokenWithBearer = req.headers.authorization;
      console.log("Authorization header:", tokenWithBearer);

      if (!tokenWithBearer) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized");
      }

      // Check for 'Bearer ' prefix with exact space
      if (tokenWithBearer.startsWith("Bearer ")) {
        // Extract token part
        const token = tokenWithBearer.split(" ")[1];
        console.log("Token extracted:", token);

        try {
          // Step 2: Verify Token
          const verifyUser = jwtHelper.verifyToken(
            token,
            config.jwt.accessSecret as Secret
          );

          // Step 3: Attach user to the request object
          req.user = verifyUser;

          // Step 4: Check if the user exists and is active
          const user = await User.findById(verifyUser.id);
          if (!user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User not found.");
          }

          // Step 5: Role-based Authorization

          // All good, proceed to next middleware
          next();
        } catch (err: any) {
          console.error("Token verification error:", err);
          if (err instanceof TokenExpiredError) {
            throw new ApiError(
              StatusCodes.UNAUTHORIZED,
              "Your session has expired. Please log in again."
            );
          }
          throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Invalid token. Please log in again."
          );
        }
      } else {
        // If token format is incorrect (e.g. missing Bearer or space)
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token format");
      }
    } catch (error) {
      next(error); // Pass error to error handling middleware
    }
  };

export default auth;
