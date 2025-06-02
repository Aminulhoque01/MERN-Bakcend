"use strict";
// import multer, { StorageEngine, FileFilterCallback } from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { Request } from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileUploadHandler;
// export default function fileUploadHandler(UPLOADS_FOLDER: string) {
//   // Ensure the upload folder exists
//   if (!fs.existsSync(UPLOADS_FOLDER)) {
//     fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
//   }
//   // Configure multer storage
//   const storage: StorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, UPLOADS_FOLDER); // Use the provided destination folder
//     },
//     filename: (req, file, cb) => {
//       const fileExt = path.extname(file.originalname); // Get the file extension
//       const filename =
//         file.originalname
//           .replace(fileExt, '') // Remove extension
//           .toLowerCase()
//           .split(' ')
//           .join('-') +
//         '-' +
//         Date.now(); // Append a timestamp
//       cb(null, filename + fileExt); // Set the final filename
//     },
//   });
//   // File filter to allow only specific file types
//   const fileFilter = (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileFilterCallback
//   ) => {
//     const allowedTypes = [
//       'image/jpg',
//       'image/jpeg',
//       'image/pdf',
//       'image/png',
//       'image/gif',
//       'image/webp',
//       'image/heic',
//       'image/heif',
//       'video/mp4', 
//       'audio/mp3', 
//     ];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true); // Accept file
//     } else {
//       console.error(`File rejected: ${file.originalname}`);
//       cb(new Error('Only jpg, jpeg, png, gif, and webp formats are allowed!'));
//     }
//   };
//   // Create and return the upload middleware
//   return multer({
//     storage,
//     limits: {
//       fileSize: 20 * 1024 * 1024, // 20MB limit
//     },
//     fileFilter,
//   });
// }
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function fileUploadHandler(UPLOADS_FOLDER) {
    // Ensure the upload folder exists
    if (!fs_1.default.existsSync(UPLOADS_FOLDER)) {
        fs_1.default.mkdirSync(UPLOADS_FOLDER, { recursive: true });
    }
    // Configure multer storage
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOADS_FOLDER); // Use the provided destination folder
        },
        filename: (req, file, cb) => {
            const fileExt = path_1.default.extname(file.originalname); // Get the file extension
            const filename = file.originalname
                .replace(fileExt, '') // Remove extension
                .toLowerCase()
                .split(' ')
                .join('-') +
                '-' +
                Date.now(); // Append a timestamp
            cb(null, filename + fileExt); // Set the final filename
        },
    });
    // File filter to allow only specific file types
    const fileFilter = (req, file, cb) => {
        const allowedTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/heic',
            'image/heif',
            'video/mp4',
            'audio/mp3',
            'application/pdf', // ✅ Corrected MIME type for PDFs
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        }
        else {
            console.error(`File rejected: ${file.originalname}`);
            cb(new Error('Only jpg, jpeg, png, gif, webp, heic, heif, mp4, mp3, and pdf formats are allowed!'));
        }
    };
    // Create and return the upload middleware
    return (0, multer_1.default)({
        storage,
        limits: {
            fileSize: 20 * 1024 * 1024, // 20MB limit
        },
        fileFilter,
    });
}
