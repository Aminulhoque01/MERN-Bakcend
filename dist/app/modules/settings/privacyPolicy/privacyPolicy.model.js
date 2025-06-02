"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyPolicy = void 0;
const mongoose_1 = require("mongoose");
const privacyPolicySchema = new mongoose_1.Schema({
    privacyPolicy: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.PrivacyPolicy = (0, mongoose_1.model)('PrivacyPolicy', privacyPolicySchema);
