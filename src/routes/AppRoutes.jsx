import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Public
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";
import ProvidersPage from "../pages/ProvidersPage";

// Auth
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

// User
import ProfilePage from "../pages/ProfilePage";
import ProviderProfilePage from "../pages/ProviderProfilePage";
import BookingPage from "../pages/BookingPage";
import MyBookingsPage from "../pages/MyBookingsPage";

// Provider
import ProviderDashboardPage from "../pages/ProviderDashboardPage";
import ProviderBookingsPage from "../pages/ProviderBookingsPage";

// Admin
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ManageBookingsPage from "../pages/admin/ManageBookingsPage";


export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/services/:category"
          element={<ProvidersPage />}
        />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* USER */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/provider/:id" element={<ProviderProfilePage />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />

      {/* PROVIDER */}
      <Route
        path="/provider-dashboard"
        element={<ProviderDashboardPage />}
      />

      <Route
        path="/provider/requests"
        element={<ProviderBookingsPage />}
      />

      {/* ADMIN */}
          <Route
      path="/admin-dashboard"
      element={<AdminDashboardPage />}
    />
      

    </Routes>
  );
}