import { getUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    const user = await getUserById(decoded);
    if (!user) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    // If token verification fails, just set req.user to null and continue
    req.user = null;
    next();
  }
};
