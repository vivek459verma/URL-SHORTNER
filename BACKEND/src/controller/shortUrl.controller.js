import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
  deleteShortUrlService,
} from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body;
    let shortUrl;
    if (!data.url) {
      const error = new Error("URL is required");
      error.statusCode = 400;
      throw error;
    }

    if (req.user) {
      shortUrl = await createShortUrlWithUser(
        data.url,
        req.user._id,
        data.slug
      );
      res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
    } else {
      shortUrl = await createShortUrlWithoutUser(data.url);
      res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
    }
  } catch (error) {
    next(error);
  }
};

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await getShortUrl(id);

    if (!url) {
      const error = new Error("Short URL not found");
      error.statusCode = 404;
      throw error;
    }

    res.redirect(url.original_url);
  } catch (error) {
    next(error);
  }
};

export const createCustomShortUrl = async (req, res, next) => {
  try {
    const { url, slug } = req.body;
    if (!url || !slug) {
      const error = new Error("URL and custom URL are required");
      error.statusCode = 400;
      throw error;
    }

    const shortUrl = await createShortUrlWithoutUser(url, slug);
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
  } catch (error) {
    next(error);
  }
};

export const deleteUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user._id;

    // Only allow deletion if user is authenticated
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    await deleteShortUrlService(id, userId);
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    next(error);
  }
};
