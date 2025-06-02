"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aboutUsSchema = new mongoose_1.Schema({
    aboutUs: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});
const AboutUs = (0, mongoose_1.model)('AboutUs', aboutUsSchema);
exports.default = AboutUs;
