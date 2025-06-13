import {
  createUser,
  getUserByEmail,
  comparePassword,
} from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";

export const register_user = async (name, email, password) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const newUser = await createUser(name, email, password);
  const token = await signToken({ id: newUser._id });
  return { token: token, user: newUser };
  // return token, newUser;
};

export const login_user = async (email, password) => {
  const user = await getUserByEmail(email);

  // Use bcrypt to compare the provided password with the stored hash
  const isPasswordValid = await comparePassword(password, user.password);
  if (!user || !isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }

  const token = await signToken({ id: user._id });
  return { token: token, user: user };
  // return { token, user };
};
