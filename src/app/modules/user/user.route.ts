import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();

router.post("/signIn", UserController.signUser);
router.post("/login", UserController.LoginUser);
router.get("/profile", auth(), UserController.profile);

export const UserRoutes = router;
