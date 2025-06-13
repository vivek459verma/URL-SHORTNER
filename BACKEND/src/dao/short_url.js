import urlSchema from "../models/shortUrl.model.js";

export const saveShortUrl = async (url, shortUrlId, userId) => {
  // console.log(userId);
  try {
    const newUrl = new urlSchema({
      original_url: url,
      short_url: shortUrlId,
    });

    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (error) {
    throw new Error("Error saving short URL: " + error.message);
  }
};

export const getShortUrl = async (shortUrlId) => {
  return await urlSchema.findOneAndUpdate(
    { short_url: shortUrlId },
    { $inc: { clicks: 1 } }
  );
};

export const getCustomSlug = async (slug) => {
  return await urlSchema.findOne({ short_url: slug });
};

export const deleteShortUrl = async (shortUrlId, userId) => {
  try {
    // If userId is provided, ensure the URL belongs to that user
    const query = { short_url: shortUrlId };
    if (userId) {
      query.user = userId;
    }

    const result = await urlSchema.deleteOne(query);
    return result.deletedCount > 0;
  } catch (error) {
    throw new Error("Error deleting short URL: " + error.message);
  }
};
