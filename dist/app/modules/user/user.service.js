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
exports.UserService = void 0;
exports.areShopsUnique = areShopsUnique;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("./user.model");
// Define JWT expiration constants
const JWT_EXPIRES_IN_REMEMBER = "30d";
const JWT_EXPIRES_IN_DEFAULT = "1d";
function areShopsUnique(shops) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield user_model_1.User.findOne({ shops: { $in: shops } });
        return !existing;
    });
}
const singUser = (username, password, shops) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.User.findOne({ username });
    if (userExists)
        throw new Error("Username already taken");
    // Check shops unique globally
    if (!(yield areShopsUnique(shops))) {
        throw new Error("One or more shop names are already taken");
    }
    // Hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Create user
    const user = new user_model_1.User({
        username,
        password: hashedPassword,
        shops,
    });
    yield user.save();
    return user;
});
const LoginUser = (username, password, rememberMe) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ username });
    if (!user)
        throw new Error("User not found");
    const validPass = yield bcrypt_1.default.compare(password, user.password);
    if (!validPass)
        throw new Error("Incorrect password");
    // Generate token
    const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, config_1.default.jwt.accessSecret, {
        expiresIn: rememberMe ? JWT_EXPIRES_IN_REMEMBER : JWT_EXPIRES_IN_DEFAULT,
    });
    return { user, token };
});
const profile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("-password");
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.UserService = {
    singUser,
    LoginUser,
    profile,
};
