import { nanoid } from "nanoid";
import jsonWebToken from "jsonwebtoken";

export const generateNanoId = (lenght) => {
  return nanoid(lenght);
};

export const signToken = async (payload) => {
  return jsonWebToken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};
