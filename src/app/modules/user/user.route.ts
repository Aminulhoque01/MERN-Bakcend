import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/signIn", UserController.signUser);

export const UserRoutes = router;
