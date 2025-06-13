import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

export const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com/");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await createShortUrl(url, customSlug);
      setShortUrl(result.shortUrl);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to create short URL");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Custom slug input - only shown when authenticated */}
      {isAuthenticated && (
        <div>
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL Slug (Optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="my-custom-url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty for a random slug
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 mb-1">Your shortened URL:</p>
          <div className="flex items-center">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium truncate flex-1"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              {copied && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded shadow">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
