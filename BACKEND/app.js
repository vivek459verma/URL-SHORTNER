import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import shortUrl_router from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";
import cors from "cors";
import auth_router from "./src/routes/auth.route.js";
import user_router from "./src/routes/user.route.js";
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config("./.env");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);

app.use("/api/user", user_router);
app.use("/api/auth", auth_router);
app.use("/api/create", shortUrl_router);
app.get("/:id", redirectFromShortUrl);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
