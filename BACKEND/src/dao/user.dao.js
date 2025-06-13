import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import UrlModel from "../models/shortUrl.model.js";

const SALT_ROUNDS = 10;

export const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (name, email, password) => {
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  return await newUser.save();
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getAllUrls = async (id) => {
  return await UrlModel.find({ user: id });
};
