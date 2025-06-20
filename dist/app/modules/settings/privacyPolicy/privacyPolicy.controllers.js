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
exports.PrivacyPolicyController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../../shared/sendResponse"));
const privacyPolicy_service_1 = require("./privacyPolicy.service");
const createOrUpdatePrivacyPolicy = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield privacyPolicy_service_1.PrivacyPolicyService.createOrUpdatePrivacyPolicy(req.body);
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: 'Privacy Policy updated successfully',
        data: result,
    });
}));
const getPrivacyPolicy = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield privacyPolicy_service_1.PrivacyPolicyService.getPrivacyPolicy();
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: 'Privacy Policy fetched successfully',
        data: result,
    });
}));
exports.PrivacyPolicyController = {
    createOrUpdatePrivacyPolicy,
    getPrivacyPolicy,
};
