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
exports.AboutUsService = void 0;
const aboutUs_model_1 = __importDefault(require("./aboutUs.model"));
// Create or Update only one "About Us" entry
const createOrUpdateAboutUs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAboutUs = yield aboutUs_model_1.default.findOne();
    if (existingAboutUs) {
        existingAboutUs.set(payload);
        yield existingAboutUs.save();
        return existingAboutUs;
    }
    else {
        const newAboutUs = yield aboutUs_model_1.default.create(payload);
        return newAboutUs;
    }
});
const getAboutUs = () => __awaiter(void 0, void 0, void 0, function* () {
    const aboutUs = yield aboutUs_model_1.default.findOne().sort({ createdAt: -1 });
    return aboutUs;
});
exports.AboutUsService = {
    createOrUpdateAboutUs,
    getAboutUs,
};
