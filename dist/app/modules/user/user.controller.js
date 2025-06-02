"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const signUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, shops } = req.body;
    if (!username || !password || !shops) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if (shops.length < 3) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "At least 3 shops are required");
    }
    const user = yield user_service_1.UserService.singUser(username, password, shops);
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "user singup sessfully",
        data: user,
    });
}));
const LoginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, rememberMe } = req.body;
    if (!username || !password) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid input");
    }
    const { user, token } = yield user_service_1.UserService.LoginUser(username, password, rememberMe);
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "user login sessfully",
        data: { user, token },
    });
}));
const profile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const user = yield user_service_1.UserService.profile(userId);
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "User profile fetched successfully",
        data: user,
    });
}));
exports.UserController = {
    signUser,
    LoginUser,
    profile,
};
