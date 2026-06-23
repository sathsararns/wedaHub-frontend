import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ContactPage from "../pages/ContactPage";

// import LoginPage from "../pages/LoginPage";
// import AdminPage from "../pages/AdminPage";
// import Test from "../pages/Test";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/test" element={<Test />} />

      <Route path="*" element={<h1>404 Not Found</h1>} /> */}
    </Routes>
  );
}

export default AppRoutes;