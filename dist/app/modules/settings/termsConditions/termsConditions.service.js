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
exports.TermsConditionsService = void 0;
const termsConditions_model_1 = require("./termsConditions.model");
const createOrUpdateTermsConditions = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTermsConditions = yield termsConditions_model_1.TermsConditions.findOne();
    if (existingTermsConditions) {
        existingTermsConditions.set(payload);
        yield existingTermsConditions.save();
        return existingTermsConditions;
    }
    else {
        const newTermsConditions = yield termsConditions_model_1.TermsConditions.create(payload);
        return newTermsConditions;
    }
});
const getTermsConditions = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield termsConditions_model_1.TermsConditions.findOne().sort({ createdAt: -1 });
    return result;
});
exports.TermsConditionsService = {
    createOrUpdateTermsConditions,
    getTermsConditions,
};
