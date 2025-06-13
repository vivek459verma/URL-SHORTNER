import express from "express";
import {
  createShortUrl,
  deleteUrl,
} from "../controller/shortUrl.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createShortUrl);
router.delete("/:id", authMiddleware, deleteUrl);
// router.post("/", c);

export default router;
