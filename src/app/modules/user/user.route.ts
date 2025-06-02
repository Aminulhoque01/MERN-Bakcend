import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/sign", UserController.signUser);

export const UserRoutes = router;
