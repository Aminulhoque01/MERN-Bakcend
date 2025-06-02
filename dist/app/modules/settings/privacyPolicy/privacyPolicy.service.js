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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyPolicyService = void 0;
const privacyPolicy_model_1 = require("./privacyPolicy.model");
const createOrUpdatePrivacyPolicy = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPrivacyPolicy = yield privacyPolicy_model_1.PrivacyPolicy.findOne();
    if (existingPrivacyPolicy) {
        existingPrivacyPolicy.set(payload);
        yield existingPrivacyPolicy.save();
        return existingPrivacyPolicy;
    }
    else {
        const newPrivacyPolicy = yield privacyPolicy_model_1.PrivacyPolicy.create(payload);
        return newPrivacyPolicy;
    }
});
const getPrivacyPolicy = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield privacyPolicy_model_1.PrivacyPolicy.findOne().sort({ createdAt: -1 });
    return result;
});
exports.PrivacyPolicyService = {
    createOrUpdatePrivacyPolicy,
    getPrivacyPolicy,
};
