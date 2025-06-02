"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/signIn", user_controller_1.UserController.signUser);
router.post("/login", user_controller_1.UserController.LoginUser);
router.get("/profile", (0, auth_1.default)(), user_controller_1.UserController.profile);
exports.UserRoutes = router;
