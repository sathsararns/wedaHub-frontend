import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

// Import your logo image (adjust the path based on your project structure)
import logo from "../../assets/images/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ Password toggle state
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      login({
        token: res.data.token,
        role: res.data.role,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        image: res.data.image || null,
      });

      toast.success("Login successful");
      
      // Small delay before navigation
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5FB] relative overflow-hidden font-sans">
      {/* Decorative background line */}
      <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 opacity-50"></div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[440px] p-8 sm:p-10 relative z-10 mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#07184B] rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={logo} 
              alt="weda Hub Logo" 
              className="w-20 h-16 object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. howard.thurman@gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4338CA] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Forgot your password?{' '}
              <a
                href="#"
                className="text-[#4338CA] font-semibold hover:text-[#07184B] hover:underline transition-colors"
              >
                Click here
              </a>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4338CA] hover:bg-[#07184B] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-7">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-4 text-sm text-gray-400 font-medium">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-[#4338CA] font-semibold hover:text-[#07184B] hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}