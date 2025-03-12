import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config/constants";

interface Product {
  name: string;
  brandName: string;
  priceWithoutEhf: number;
  regularPrice: number;
  isOnSale: boolean;
  saving: number;
  customerRating: number;
  customerRatingCount: number;
  additionalImages: string[];
}

export default function TrackProductPage() {
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(
          `${backendUrl}api/user/getSavedProduct`,
        );
        const userSavedProducts: Product[] = response.data.products;
        if (userSavedProducts.length > 0) {
          setProducts([...userSavedProducts]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadData();
  });

  const handleTrackProduct = async () => {
    if (!productUrl.trim()) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `${backendUrl}api/crawl/BB?url=${productUrl}`,
      );
      const resProduct = response.data.product;
      if (resProduct) {
        /*
        setProducts(() => {
          const newProduct = [...products, resProduct];
          return newProduct;
        });
        */
        setProducts([...products, resProduct]);
      }
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
      {products.length > 0 && (
        <div className="">
          <img src="" />
        </div>
      )}{" "}
    </div>
  );
}
