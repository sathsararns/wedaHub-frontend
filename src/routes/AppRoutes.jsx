import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Public Pages
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";
import ProvidersPage from "../pages/ProvidersPage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import ProviderProfilePage from "../pages/Providers/ProfilePage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/services" element={<ServicesPage />} />

        {/* Category එකට අදාල Providers */}
        <Route
          path="/services/:category"
          element={<ProvidersPage />}
        />

        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route
    path="/provider/:id"
    element={<ProviderProfilePage />}
/>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />} />

      <Route path="/profile" element={<ProfilePage />} />

    </Routes>
  );
}