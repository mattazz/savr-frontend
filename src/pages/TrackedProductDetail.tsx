import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { backendUrl } from "../config/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ProductDetails {
  _id: string;
  name: string;
  brandName: string;
  salePrice: number;
  regularPrice: number;
  // isOnSale: boolean;
  // saving: number;
  customerRating: number;
  customerRatingCount: number;
  images: string[];
  url: string;
  longDescription: string;
  // saleStartDate: string;
  // saleEndDate: string;
  sku: string;
  // grade: string;
  // hasFrenchContent: boolean;
  // altLangSeoText: string;
  // isClearance: boolean;
  // isOnlineOnly: boolean;
  // isMarketplace: boolean;
  priceDateHistory: {
    Number: number;
    Date: string;
    _id: string;
  }[];
}

interface TooltipPayload {
  payload: {
    price: number;
  };
}

// Custom tooltip for the chart
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: TooltipPayload[];
  label: string;
}) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{new Date(label).toLocaleDateString()}</p>
        <p className="text-blue-600">${data.price.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function ProductDetailsPage() {
  const [data] = useSearchParams();
  const productId = data.get("productId");
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!productId) return;
    async function fetchProductDetails() {
      try {
        const response = await axios.get(
          `${backendUrl}api/products/history?productId=${productId}`,
          { withCredentials: true }
        );
        console.log(response);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductDetails();
  }, [productId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // const calculateDaysLeft = (endDate: string) => {
  //   const today = new Date();
  //   const saleEnd = new Date(endDate);
  //   const diffTime = saleEnd.getTime() - today.getTime();
  //   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  // const daysLeft = calculateDaysLeft(product.saleEndDate);

  // Prepare data for the chart
  const chartData = product.priceDateHistory
    .map((entry) => ({
      date: new Date(entry.Date).getTime(),
      price: entry.Number,
      dateString: formatDate(entry.Date),
    }))
    .sort((a, b) => a.date - b.date);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <a
                  href="/track"
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  Products
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-24 bg-gray-100 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                by {product.brandName} • SKU: {product.sku}
              </p>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.customerRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-600">
                    {product.customerRating
                      ? product.customerRating.toFixed(1)
                      : "N/A"}{" "}
                    ({product.customerRatingCount} reviews)
                  </span>
                </div>
                {/* <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {product.grade}
                </span> */}
              </div>

              <div className="mb-6">
                {product.regularPrice !== product.salePrice && (
                  <div className="mb-2">
                    <span className="text-sm text-gray-500 line-through mr-2">
                      ${product.regularPrice}
                    </span>
                    {/* <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-0.5 rounded">
                      Save ${product.saving.toFixed(2)}
                    </span> */}
                  </div>
                )}
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${product.salePrice.toFixed(2)}
                </div>
                {/* {product.isOnSale && (
                  <div className="text-green-600 font-medium">
                    Sale ends in {daysLeft} day{daysLeft !== 1 ? "s" : ""} (
                    {formatDate(product.saleEndDate)})
                  </div>
                )} */}
              </div>

              <div className="mb-6">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block text-center w-full"
                >
                  View on BestBuy
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.longDescription }}
                />
              </div>
            </div>
          </div>

          {/* Price History Chart Section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Price History</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(unixTime) =>
                      new Date(unixTime).toLocaleDateString()
                    }
                  />
                  <YAxis
                    domain={[
                      (dataMin: number) =>
                        Math.max(0, Math.floor(dataMin * 0.9)),
                      (dataMax: number) => Math.ceil(dataMax * 1.1),
                    ]}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  {/* @ts-expect-error expect error here*/}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    name="Price ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Price History Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.priceDateHistory
                    .sort(
                      (a, b) =>
                        new Date(b.Date).getTime() - new Date(a.Date).getTime()
                    )
                    .map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(entry.Date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${entry.Number.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
