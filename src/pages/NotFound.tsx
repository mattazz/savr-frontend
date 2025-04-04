import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-teal-600 opacity-10 absolute inset-0 flex items-center justify-center">
            404
          </div>
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
              <Search className="w-16 h-16 text-teal-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-teal-600 rounded-lg text-sm font-medium text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-8">
            Need help?{" "}
            <Link
              to="/contact"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
