import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">Login</h1>

      <form className="flex flex-col gap-5 mt-4 w-80">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <button className="bg-white text-black border border-gray-400 shadow-md rounded-sm p-2 hover:bg-gray-100 transition">
          LOGIN
        </button>

        <div className="flex items-center justify-center">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <button className="flex items-center justify-center gap-2 bg-white border border-gray-400 shadow-md rounded-sm p-2 hover:bg-gray-100 transition">
          <img src="/googleicon.jpg" alt="Google Logo" className="w-5 h-5" />
          Login with Google
        </button>
      </form>

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

