import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../utils/hooks";

function CustomNav() {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {user && !user.isVerified && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 font-medium">
                Your email address is not verified
              </p>
              <p className="mt-1 text-sm text-yellow-600">
                Please check your mailbox to verify your account as unverified
                accounts are deleted in ten days
              </p>
            </div>
          </div>
        </div>
      )}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-teal-600">SAVR</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-teal-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/track"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Saved
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition duration-200"
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/track"
                    className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition duration-200"
                  >
                    Saved
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default CustomNav;
