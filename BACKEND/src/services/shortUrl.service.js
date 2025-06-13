import {
  getCustomSlug,
  saveShortUrl,
  deleteShortUrl,
} from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async (url) => {
  try {
    const shortUrlId = generateNanoId(7);
    await saveShortUrl(url, shortUrlId);
    return shortUrlId;
  } catch (error) {
    throw new Error("Error creating short URL without user: " + error.message);
  }
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  // console.log(userId);
  const shortUrlId = slug || generateNanoId(7);

  const existingSlug = await getCustomSlug(slug);
  if (existingSlug) {
    const error = new Error("Custom URL already exists");
    error.statusCode = 400;
    throw error;
  }

  await saveShortUrl(url, shortUrlId, userId);
  return shortUrlId;
};

export const deleteShortUrlService = async (shortUrlId, userId) => {
  try {
    const deleted = await deleteShortUrl(shortUrlId, userId);
    if (!deleted) {
      const error = new Error(
        "URL not found or you don't have permission to delete it"
      );
      error.statusCode = 404;
      throw error;
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
};
