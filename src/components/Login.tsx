import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../config/constants";
import { useUser } from "../utils/hooks";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmailOrUsername] = useState(""); // state for email or username
  const [password, setPassword] = useState(""); // state for password
  const [error, setError] = useState(""); // state to store error messages
  const [loading, setLoading] = useState(false); // loading state for submitting

  const { setUser } = useUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(""); // Reset previous error

    try {
      const response = await axios.post(`${backendUrl}api/user/login/ep`, {
        email,
        password,
      });
      console.log(response);

      setUser(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Login failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4 w-80">
        {/* Email/Username Input */}
        <input
          type="text"
          placeholder="Username/Email"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />

        {/* Password Input */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-white text-black border border-gray-400 shadow-md rounded-sm p-2 hover:bg-gray-100 transition"
          disabled={loading} // Disable button while submitting
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {/* OR Section */}
        <div className="flex items-center justify-center">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-400 shadow-md rounded-sm p-2 hover:bg-gray-100 transition">
          <img src="/googleicon.jpg" alt="Google Logo" className="w-5 h-5" />
          Login with Google
        </button>
      </form>

      {/* Sign up link */}
      <p className="mt-4 text-gray-600">
        No account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Login;
