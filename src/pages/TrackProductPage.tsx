import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../config/constants";

export default function TrackProductPage() {
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackProduct = async () => {
    if (!productUrl.trim()) return;

    setIsLoading(true);

    try {
      await axios.post(`${backendUrl}api/products/track-product`, {
        url: productUrl,
      });
    } catch (error) {
      console.error("Error tracking product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Track a Product
        </h2>

        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter product URL (e.g., Walmart, Amazon)"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
        />

        <button
          onClick={handleTrackProduct}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Tracking..." : "Track Product"}
        </button>
      </div>
    </div>
  );
}
