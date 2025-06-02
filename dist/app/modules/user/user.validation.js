"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = isValidPassword;
function isValidPassword(password) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return password.length >= 8 && re.test(password);
}
