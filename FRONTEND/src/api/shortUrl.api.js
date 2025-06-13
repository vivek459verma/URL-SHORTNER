import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
  try {
    const { data } = await axiosInstance.post("/api/create", {
      url,
      slug,
    });
    return { success: true, shortUrl: data.shortUrl };
  } catch (error) {
    // Use the custom error message from our interceptor
    return {
      success: false,
      error: error.customMessage || "Failed to create short URL",
    };
  }
};

export const deleteShortUrl = async (shortUrlId) => {
  try {
    await axiosInstance.delete(`/api/create/${shortUrlId}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to delete URL",
    };
  }
};
