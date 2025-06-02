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
exports.sendEmail = exports.sendResetPasswordEmail = exports.sendEmailVerification = void 0;
const colors_1 = __importDefault(require("colors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../shared/logger");
const config_1 = __importDefault(require("../config"));
// Create Nodemailer transporter
const transporter = nodemailer_1.default.createTransport({
    // host: config.email.smtp.host,
    // port: Number(config.email.smtp.port),
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: config.email.smtp.auth.user,
    //   pass: config.email.smtp.auth.pass,
    // },
    host: config_1.default.email.smtp.host,
    port: Number(config_1.default.email.smtp.port),
    auth: {
        user: config_1.default.email.smtp.auth.user,
        pass: config_1.default.email.smtp.auth.pass
    }
});
// Verify transporter connection
if (config_1.default.env !== 'test') {
    transporter
        .verify()
        .then(() => logger_1.logger.info(colors_1.default.cyan('📧  Connected to email server')))
        .catch(err => logger_1.logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}
// Function to send email
const sendEmail = (values) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(values);
    try {
        const info = yield transporter.sendMail({
            from: `"${config_1.default.email.from}"`, // sender address
            to: values.to, // list of receivers
            subject: values.subject, // subject line
            html: values.html, // html body
        });
        logger_1.logger.info('Mail sent successfully', info.accepted);
    }
    catch (error) {
        logger_1.errorLogger.error('Email', error);
    }
});
exports.sendEmail = sendEmail;
// Generate email body
const generateEmailBody = (otp, type) => {
    const title = type === 'Password Reset' ? 'Password Reset Code' : 'Welcome to Qeyys';
    const introText = type === 'Password Reset'
        ? 'We received a request to reset your password. Use the code below to reset your password.'
        : 'Thank you for joining Qeyys! Your account is almost ready. Use the code below to verify your account.';
    return `
    <body style="background-color: #e9effb; font-family: 'Arial', sans-serif; color: #333; margin: 0; padding: 0;">
      <div style="width: 80%; margin: 0 auto; padding: 1rem; background-color: #e9effb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); text-align: center;">
            <!-- Logo -->
          <img src="https://i.postimg.cc/7hxxtRLC/new-logo.png" alt="Qeyys Logo" style="max-width: 120px; margin-bottom: 20px; border-radius: 10px;">

          <!-- Header -->
          <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: #0741AD; font-family: 'Helvetica Neue', sans-serif;">${title}</h1>

          <!-- Introductory Text -->
          <p style="color: #4b5563; margin-bottom: 1.5rem; font-size: 1rem; line-height: 1.5;">${introText}</p>

            <!-- OTP Code Box -->
              <div style="width: 50%; margin: 0 auto; background-color: #0741AD; color: #ffffff; padding: 0.5rem; border-radius: 0.5rem; text-align: center;">
                <p style="font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem; text-transform: uppercase;">${otp}</p>
              </div>

              <!-- Verification Instructions -->
              <p style="color: #4b5563; margin-bottom: 1.5rem; font-size: 1rem;">Enter this code to verify your account.</p>

            <!-- Footer Text -->
            <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">If you did not request this verification, please ignore this email.</p>
            <p style="color: #6b7280; font-size: 0.875rem;">Thanks, The Qeyys Team</p>

          <!-- Expiry Information -->
            <p style="color: #ff0000; font-size: 0.85rem; margin-top: 1.5rem;">This code expires in <span id="timer">3:00</span> minutes.</p>
        </div>
      </div>
    </body>

  `;
};
// Function to send email verification
const sendEmailVerification = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Werkstekkie - Account Verification Code';
    const html = generateEmailBody(otp, 'Account Verification');
    yield sendEmail({ to, subject, html });
});
exports.sendEmailVerification = sendEmailVerification;
// Function to send reset password email
const sendResetPasswordEmail = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Qeyys - Password Reset Code';
    const html = generateEmailBody(otp, 'Password Reset');
    yield sendEmail({ to, subject, html });
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
