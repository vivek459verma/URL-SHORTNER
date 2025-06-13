import { cookieOptions } from "../config/cookie.config.js";
import { register_user, login_user } from "../services/auth.service.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters");
    error.statusCode = 400;
    throw error;
  }

  const { token, user } = await register_user(name, email, password);
  req.user = user;
  res.cookie("accesstoken", token, cookieOptions);
  res.status(200).json({ message: "register success" });
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const { token, user } = await login_user(email, password);

    // Ensure the token is valid before setting the cookie
    if (!token) {
      throw new Error("Failed to generate authentication token");
    }

    // Set the cookie with the correct name
    res.cookie("accesstoken", token, cookieOptions);

    res.status(200).json({
      user: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("accesstoken", cookieOptions);
  res.status(200).json({ message: "logout success" });
};

export const get_current_user = async (req, res) => {
  res.status(200).json({ user: req.user });
};
