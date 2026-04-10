import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./Admin/AdminDashboard";
import Contact from "./pages/Contact";
import MoreAbout from "./pages/MoreAbout";
import AdminSignin from "./Admin/AdminSignin";
import AdminSignup from "./Admin/AdminSignup";

// 👉 Create these pages (or use temporary ones)
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";   

function Layout() {
  const location = useLocation();

  // Hide user navbar in admin pages
  const path = location.pathname.toLowerCase();
  const isAdmin = path.startsWith("/admin");
  const isAdminAuth = path === "/admin-signin" || path === "/admin-signup";
  const isLoggedIn = Boolean(localStorage.getItem("adminToken"));
  const ProtectedAdmin = isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-signin" replace />;

  return (
    <>
      {!isAdmin && !isAdminAuth && <Navbar />}

      <Routes>
        {/* ===== USER ROUTES ===== */}
        <Route path="/" element={<Home />} />

        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/more-about" element={<MoreAbout />} />
        <Route path="/admin-signin" element={<AdminSignin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* ===== ADMIN ROUTE ===== */}
        <Route path="/admin" element={ProtectedAdmin} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;