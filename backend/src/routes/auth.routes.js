import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import validateToken from "../middlewares/validateToken.js";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/profile", validateToken, UserController.profile);

export default router;
