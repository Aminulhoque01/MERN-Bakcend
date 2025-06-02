"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsConditions = void 0;
const mongoose_1 = require("mongoose");
const termsConditionsSchema = new mongoose_1.Schema({
    termsConditions: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.TermsConditions = (0, mongoose_1.model)('TermsConditions', termsConditionsSchema);
