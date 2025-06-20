import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFount";
import router from "./routes";
import { Morgan } from "./shared/morgen";

const app = express();

// morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);

// body parser
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie-parser to parse cookies
app.use(cookieParser());

// file retrieve
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// router
app.use("/api/v1", router);



// live response
app.get("/test", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Thera Track Server" });
});

// global error handle
app.use(globalErrorHandler);

// handle not found route
app.use(notFound);

export default app;
