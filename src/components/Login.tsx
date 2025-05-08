import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../config/constants";
import { useUser } from "../utils/hooks";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import RedirectIfLoggedInTo from "@/utils/redirector";
import { useToast } from "@/hooks/use-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //NOTE: if you are redirecting to login page from any page, this is the name of the url param u wanna pass with the value of
  //the url you wish to be redirected after user authenticates .i.e redirect_uri
  const redirectUri = searchParams.get("redirect_uri");

  const { setUser } = useUser();

  const handleLoginClick = () => {
    window.location.href = `${backendUrl}api/user/auth/google`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setFieldErrors({});
    setGeneralError("");

    try {
      const response = await axios.post(
        `${backendUrl}api/user/login/ep`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      setUser(response.data);
      //if login is successful and there is a redirect uri in the current path, then redirect to that path mate:)
      if (redirectUri) {
        navigate(redirectUri, { replace: true });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("❌ Login failed:", err.response?.data);

        // Handle field-wise validation errors
        if (
          err.response?.data.errors &&
          typeof err.response.data.errors === "object"
        ) {
          setFieldErrors(err.response.data.errors);
        } else if (err.response?.data.error) {
          // If it's a string, treat as general error
          if (typeof err.response.data.error === "string") {
            setGeneralError(err.response.data.error);
          }
          // If it's an array of Zod errors, just show the first one as general error
          else if (Array.isArray(err.response.data.error)) {
            setGeneralError(
              err.response.data.error[0]?.message ||
              "Login failed. Please try again.",
            );
          } else {
            setGeneralError("Login failed. Please try again.");
          }
        } else if (err.response?.data.message) {
          setGeneralError(err.response.data.message);
        } else {
          setGeneralError("Login failed. Please try again.");
        }
      } else {
        setGeneralError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email/Username Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username/Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your username or email"
              className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                } transition duration-200`}
              value={email}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  } transition duration-200 pr-12`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-teal-600 transition duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* General Error Message */}
          {generalError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {generalError}
            </div>
          )}
        </form>

        {/* OR Section */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleLoginClick}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
        >
          <img src="/googleicon.jpg" alt="Google Logo" className="w-5 h-5" />
          Sign in with Google
        </button>

        {/* Sign up link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function Login() {
  const location = useLocation();
  const { toast } = useToast();

  // Get the path of the URL we would want to redirect to after login
  const redirectUri =
    new URLSearchParams(location.search).get("redirect_uri") || "/";

  useEffect(() => {
    if (location.search.includes("redirect_uri")) {
      toast({
        title: "Login required",
        description: "Please log in to track products.",
        variant: "default",
      });
    }
  }, [location.search, toast]);

  return (
    <RedirectIfLoggedInTo path={redirectUri}>
      <LoginPage />
    </RedirectIfLoggedInTo>
  );
}

export default Login;
