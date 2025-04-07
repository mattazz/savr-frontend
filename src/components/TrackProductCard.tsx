import { Link } from "react-router-dom";
import { useState } from "react";

interface TrackProductCardProps {
  index: number;
  name: string;
  brandName: string;
  additionalImages: string[];
  priceWithoutEhf: number;
  regularPrice: number;
  isOnSale: boolean;
  saving: number;
  customerRating: number;
  customerRatingCount: number;
  url: string;
  productId: string;
  onDelete: () => void;
}

export default function TrackProductsCard({
  index,
  name,
  brandName,
  additionalImages,
  priceWithoutEhf,
  regularPrice,
  isOnSale,
  saving,
  customerRating,
  url,
  customerRatingCount,
  onDelete,
  productId,
}: TrackProductCardProps) {
  const handleDelete = () => {
    onDelete();
  };

  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertPrice, setAlertPrice] = useState("");
  const [email, setEmail] = useState("");

  return (
    <li
      key={index}
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <div className="space-y-4">
        {/* Product Image */}
        <div className="relative w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={additionalImages[0]}
            alt={name}
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {name}
          </h4>
          <p className="text-sm text-gray-600">Brand: {brandName}</p>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            {isOnSale ? (
              <>
                <span className="text-gray-400 text-sm line-through">
                  ${regularPrice}
                </span>
                <span className="text-teal-600 font-semibold text-lg">
                  ${priceWithoutEhf}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-semibold text-lg">
                ${regularPrice}
              </span>
            )}
          </div>

          {/* Sale Badge */}
          {isOnSale && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              Save ${saving}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="text-yellow-400">⭐</span>
            <span>{customerRating}</span>
            <span className="text-gray-400">
              ({customerRatingCount} reviews)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Link
            to={`/productdetail?productId=${productId}`}
            className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition duration-200"
          >
            View Chart History
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition duration-200"
          >
            Remove Product
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center px-4 py-2 bg-white border border-teal-600 text-teal-600 text-sm font-medium rounded-lg hover:bg-teal-50 transition duration-200"
          >
            Buy Now
          </a>

          {/* 🔔 Alert Price Button */}
          <button
            type="button"
            onClick={() => setShowAlertForm(!showAlertForm)}
            className="w-full flex items-center justify-center px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-lg hover:bg-yellow-200 transition duration-200"
          >
            {showAlertForm ? "Cancel Alert" : "🔔 Alert Price"}
          </button>

          {/* Alert Price Form */}
          {showAlertForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                //TODO:handle add alert logic here
                setAlertPrice("");
                setEmail("");
                setShowAlertForm(false);
              }}
              className="space-y-2"
            >
              <input
                type="number"
                step="0.01"
                placeholder="Target Price ($)"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Set Alert
              </button>
            </form>
          )}
        </div>
      </div>
    </li>
  );
}
