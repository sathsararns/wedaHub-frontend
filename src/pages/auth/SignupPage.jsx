import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";

import RoleSelector from "../../components/auth/RoleSelector";
import CustomerFields from "../../components/auth/CustomerFields";
import ProviderFields from "../../components/auth/ProviderFields";

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
    address: "",
    location: "",
    businessName: "",
    description: "",
    category: "",
    serviceRadius: "",
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

    return (
      minLength &&
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSymbol
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔥 DEBUG
    console.log("========== SIGNUP DEBUG ==========");
    console.log("FORM DATA:", formData);
    console.log("PASSWORD:", formData.password);
    console.log("PASSWORD LENGTH:", formData.password.length);
    console.log("HAS UPPER:", /[A-Z]/.test(formData.password));
    console.log("HAS LOWER:", /[a-z]/.test(formData.password));
    console.log("HAS NUMBER:", /[0-9]/.test(formData.password));
    console.log("HAS SYMBOL:", /[!@#$%^&*]/.test(formData.password));
    console.log("VALID:", validatePassword(formData.password));
    console.log("=================================");

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

      console.log("PAYLOAD:", payload);

      const res = await api.post("/users/register", payload);

      console.log("SERVER RESPONSE:", res.data);

      toast.success("Account created successfully");

      navigate("/login");

    } catch (err) {
      console.log("SERVER ERROR:", err.response?.data);

      toast.error(
        err.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Toaster />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Sign Up
        </h1>

        <input
          name="firstName"
          placeholder="First Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <RoleSelector
          role={role}
          setRole={setRole}
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}