import { getUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accesstoken;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      req.user = null;
      return next();
    }

    const user = await getUserById(decoded);
    if (!user) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in attachUser middleware:", error.message);
    req.user = null;
    next();
  }
};
