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
        // FIXME returning a 404 in front-end but okay in backend
        const response = await axios.get(
          `${backendUrl}api/user/getSavedProducts`, 
          {withCredentials: true}
        );
        const userSavedProducts: Product[] = response.data.products;
        console.log("Fetched products:", response.data);

        if (userSavedProducts.length > 0) {
          setProducts([...userSavedProducts]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadData();
  }, []);

  const handleTrackProduct = async () => {
    if (!productUrl.trim()) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `${backendUrl}api/crawl/BB?url=${productUrl}`,
        {withCredentials: true}
      );
      const resProduct = response.data.product;
      if (resProduct) {
        setProducts([...products, resProduct]);
      }
    } catch (error) {
      console.error("Error tracking product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-#f4c538">
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
  <div className="w-full max-w-7xl mx-auto">
    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center mt-4"  >Saved Products</h3>
    <ul className="w-full flex flex-wrap gap-4 justify-center ">
      {products.map((product, index) => (
        // TODO Make this into a component
        <li 
          key={index} 
          className="p-4 border bg-white rounded-lg w-1/4 flex flex-col items-center shadow-2xl hover:scale-105 transition-all duration-500  "
        >
          <h4 className="text-lg font-bold text-center">{product.name}</h4>
          <p className="text-gray-600">Brand: {product.brandName}</p>
          <img src={product.additionalImages[0]} alt="" className="w-40 h-40 object-cover rounded-md mb-2" />
          <p>Price: <span className="font-bold">${product.priceWithoutEhf}</span></p>
          <p className="text-gray-500 line-through">Regular: ${product.regularPrice}</p>
          <p className={`text-sm font-semibold ${product.isOnSale ? "text-green-600" : "text-red-600"}`}>
            On Sale: {product.isOnSale ? "Yes" : "No"}
          </p>
          <p className="text-yellow-500">Saving: ${product.saving}</p>
          <p className="text-sm text-gray-700">
            Customer Rating: ⭐ {product.customerRating} ({product.customerRatingCount} reviews)
          </p>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
}
