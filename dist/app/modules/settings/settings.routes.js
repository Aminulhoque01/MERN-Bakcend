"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = require("express");
const aboutUs_controllers_1 = require("./aboutUs/aboutUs.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const privacyPolicy_controllers_1 = require("./privacyPolicy/privacyPolicy.controllers");
const termsConditions_controllers_1 = require("./termsConditions/termsConditions.controllers");
const router = (0, express_1.Router)();
router
    .route('/about-us')
    .get(aboutUs_controllers_1.AboutUsController.getAboutUs)
    .post((0, auth_1.default)('admin'), aboutUs_controllers_1.AboutUsController.createOrUpdateAboutUs);
router
    .route('/privacy-policy')
    .get(privacyPolicy_controllers_1.PrivacyPolicyController.getPrivacyPolicy)
    .post((0, auth_1.default)('admin'), privacyPolicy_controllers_1.PrivacyPolicyController.createOrUpdatePrivacyPolicy);
router
    .route('/terms-conditions')
    .get(termsConditions_controllers_1.TermsConditionsController.getTermsConditions)
    .post((0, auth_1.default)('admin'), termsConditions_controllers_1.TermsConditionsController.createOrUpdateTermsConditions);
exports.SettingsRoutes = router;
