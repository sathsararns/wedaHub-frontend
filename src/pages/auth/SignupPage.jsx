import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";

import RoleSelector from "../../components/auth/RoleSelector";
import CustomerFields from "../../components/auth/CustomerFields";
import ProviderFields from "../../components/auth/ProviderFields";

// Import your logo (same as login page)
import logo from "../../assets/images/logo.png";

export default function SignupPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",

  // Customer + Provider
  city: "",
  district: "",

  // Provider only
  description: "",
  category: "",
});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password Validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);

    return minLength && hasUpper && hasLower && hasNumber && hasSymbol;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!validatePassword(formData.password)) {
        toast.error(
          "Password must be 8+ chars with uppercase, lowercase, number & symbol"
        );
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        role,
      };

      const res = await api.post("/users/register", payload);

      toast.success("Account created successfully");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5FB] relative overflow-hidden font-sans py-12">
      <Toaster position="top-center" />

      {/* Decorative background line */}
      <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 opacity-50"></div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[480px] p-8 sm:p-10 relative z-10 mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[#07184B] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="වැල Hub Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2 tracking-tight">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Create your account to get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="e.g. John"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="e.g. Doe"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. john.doe@gmail.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 8 chars with A-Z, a-z, 0-9 & symbol"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. +94 77 123 4567"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Account Type
            </label>
            <RoleSelector role={role} setRole={setRole} />
          </div>

          {/* Conditional Fields */}
          {role === "customer" && (
            <CustomerFields
              formData={formData}
              handleChange={handleChange}
            />
          )}

          {role === "provider" && (
            <ProviderFields
              formData={formData}
              handleChange={handleChange}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4338CA] hover:bg-[#07184B] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#4338CA] font-semibold hover:text-[#07184B] hover:underline transition-colors"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}