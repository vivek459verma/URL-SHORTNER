import { getAllUrls } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res, next) => {
  // console.log(req.user);
  const { _id } = req.user;
  const urls = await getAllUrls(_id);

  res.status(200).json({ message: "User urls", urls });
};
