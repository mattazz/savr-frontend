import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../utils/hooks";
import LogoutButton from "./subcomponents/LogoutButton";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function CustomNav() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {user && !user.isVerified && (
        <Alert className="bg-yellow-100 border border-yellow-300 text-yellow-800 shadow-sm rounded-lg px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-yellow-600" />
            <div>
              <AlertTitle className="text-sm font-medium">
                Your email address is not verified
              </AlertTitle>
              <AlertDescription className="mt-1 text-sm text-yellow-700">
                Please check your inbox to verify your account. Unverified
                accounts will be deleted in{" "}
                <span className="font-medium">10 days</span>.
              </AlertDescription>
            </div>
          </div>
        </Alert>
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
                  <LogoutButton>
                    <div className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                      Logout
                    </div>
                  </LogoutButton>
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
                  <LogoutButton>
                    <div className="block text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-base font-medium transition duration-200">
                      Logout
                    </div>
                  </LogoutButton>
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
