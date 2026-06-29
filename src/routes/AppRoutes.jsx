import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// pages
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";

// auth
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ProfilePage from "../pages/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />

    </Routes>
  );
}