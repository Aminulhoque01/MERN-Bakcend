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
exports.AboutUsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const aboutUs_service_1 = require("./aboutUs.service");
const createOrUpdateAboutUs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aboutUs_service_1.AboutUsService.createOrUpdateAboutUs(req.body);
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: 'About us updated successfully',
        data: result,
    });
}));
const getAboutUs = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield aboutUs_service_1.AboutUsService.getAboutUs();
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: 'About us fetched successfully',
        data: result,
    });
}));
exports.AboutUsController = {
    createOrUpdateAboutUs,
    getAboutUs,
};
