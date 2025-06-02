import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticateToken } from "../../middlewares/auth";

const router = Router();

router.post("/signIn", UserController.signUser);
router.post("/login", UserController.LoginUser);
router.get("/profile", authenticateToken, UserController.profile);

export const UserRoutes = router;
