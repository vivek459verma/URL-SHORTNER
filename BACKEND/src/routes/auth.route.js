import express from "express";
import {
  get_current_user,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, get_current_user);

export default router;
