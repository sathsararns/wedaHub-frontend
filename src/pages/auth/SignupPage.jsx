import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation, useReducedMotion } from "framer-motion";

import RoleSelector from "../../components/auth/RoleSelector";
import CustomerFields from "../../components/auth/CustomerFields";
import ProviderFields from "../../components/auth/ProviderFields";

// Import your logo (same as login page)
import logo from "../../assets/images/logo.png";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function SignupPage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const cardControls = useAnimation();

  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Password toggle state

  // Initial form state - reset function එකට use කරන්න
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

  // Entrance animation; the shake on failed submit below reuses the same
  // controls, animating only `x`, so it layers on top of this rest state.
  useEffect(() => {
    cardControls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" },
    });
  }, [cardControls, shouldReduceMotion]);

  // ✅ Updated handleChange with functional state update
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form function
  const resetForm = () => {
    setFormData(initialFormData);
    setRole("customer"); // Role එකත් reset කරන්න
    setShowPassword(false); // Password toggle එකත් reset කරන්න
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

  const shakeCard = () => {
    if (shouldReduceMotion) return;
    cardControls.start({
      x: [0, -10, 10, -8, 8, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
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
        shakeCard();
        return;
      }

      const payload = {
        ...formData,
        role,
      };

      await api.post("/users/register", payload);

      // Success message
      toast.success("Account created successfully! Redirecting to login...");

      // Form reset කරන්න
      resetForm();

      // 1.5s පස්සේ login page එකට navigate කරන්න
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      shakeCard();
    } finally {
      setLoading(false);
    }
  };

  const fieldFocus = shouldReduceMotion ? undefined : { scale: 1.01 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5FB] relative overflow-hidden font-sans py-12">
      <Toaster position="top-center" />

      {/* Decorative background line */}
      <div className="absolute left-0 right-0 top-[30%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 opacity-50"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={cardControls}
        className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-[480px] p-8 sm:p-10 relative z-10 mx-4"
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <div className="w-24 h-24 bg-[#07184B] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="වැල Hub Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2 tracking-tight">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Create your account to get started
        </p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* First Name */}
          <motion.div variants={riseItem}>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              First Name
            </label>
            <motion.input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="e.g. John"
              value={formData.firstName}
              whileFocus={fieldFocus}
              transition={{ duration: 0.15 }}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Last Name */}
          <motion.div variants={riseItem}>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Last Name
            </label>
            <motion.input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="e.g. Doe"
              value={formData.lastName}
              whileFocus={fieldFocus}
              transition={{ duration: 0.15 }}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={riseItem}>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Email
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. john.doe@gmail.com"
              value={formData.email}
              whileFocus={fieldFocus}
              transition={{ duration: 0.15 }}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Password with Toggle */}
          <motion.div variants={riseItem}>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <motion.input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 chars with A-Z, a-z, 0-9 & symbol"
                value={formData.password}
                onChange={handleChange}
                required
                whileFocus={fieldFocus}
                transition={{ duration: 0.15 }}
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileTap={{ scale: 0.85 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4338CA] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={showPassword ? "hide" : "show"}
                    initial={{ opacity: 0, rotate: -20 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 20 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div variants={riseItem}>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-900 mb-1.5"
            >
              Phone
            </label>
            <motion.input
              id="phone"
              name="phone"
              type="tel"
              placeholder="e.g. +94 77 123 4567"
              value={formData.phone}
              whileFocus={fieldFocus}
              transition={{ duration: 0.15 }}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              onChange={handleChange}
              required
            />
          </motion.div>

          {/* Role Selector */}
          <motion.div variants={riseItem}>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Account Type
            </label>
            <RoleSelector role={role} setRole={setRole} />
          </motion.div>

          {/* Conditional Fields — animate the swap since the role toggle
              genuinely changes which fields are shown */}
          <AnimatePresence mode="wait" initial={false}>
            {role === "customer" && (
              <motion.div
                key="customer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <CustomerFields formData={formData} handleChange={handleChange} />
              </motion.div>
            )}

            {role === "provider" && (
              <motion.div
                key="provider"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <ProviderFields formData={formData} handleChange={handleChange} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            variants={riseItem}
            type="submit"
            disabled={loading}
            whileHover={shouldReduceMotion || loading ? undefined : { scale: 1.01 }}
            whileTap={loading ? undefined : { scale: 0.98 }}
            className="w-full bg-[#4338CA] hover:bg-[#07184B] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-sm"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={loading ? "loading" : "idle"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-block"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Login Link */}
          <motion.p variants={riseItem} className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#4338CA] font-semibold hover:text-[#07184B] hover:underline transition-colors"
            >
              Log in
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}