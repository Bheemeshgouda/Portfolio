import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";

function AdminNavbar({ setActive, active, unreadCount = 0 }) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin-signin");
  };


  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleMenuItemClick = (section) => {
    setActive(section);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setOpen(false);
  };

  return (
    <nav className="admin-navbar">

      {/* LEFT */}
      <div className="admin-left">
        <h2>Admin Dashboard</h2>

        {/* Mobile Menu Button */}
        <div 
          className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className={`admin-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <li
            className={active === "dashboard" ? "active-link" : ""}
            onClick={() => handleMenuItemClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={active === "edit-about" ? "active-link" : ""}
            onClick={() => handleMenuItemClick("edit-about")}
          >
            Edit About
          </li>
          
          {/* Add Project Dropdown */}
          <li className="dropdown-container">
            <div 
              className="dropdown-header"
              onClick={() => handleDropdownToggle("project")}
            >
              Projects <FaChevronDown className={`dropdown-icon ${openDropdown === "project" ? "rotate" : ""}`} />
            </div>
            {openDropdown === "project" && (
              <ul className="dropdown-menu">
                <li
                  className={active === "add-project" ? "active-link" : ""}
                  onClick={() => handleMenuItemClick("add-project")}
                >
                  Add New Project
                </li>
                <li
                  className={active === "view-projects" ? "active-link" : ""}
                  onClick={() => handleMenuItemClick("view-projects")}
                >
                  View All Projects
                </li>
              </ul>
            )}
          </li>

          {/* Add Skills Dropdown */}
          <li className="dropdown-container">
            <div 
              className="dropdown-header"
              onClick={() => handleDropdownToggle("skills")}
            >
              Skills <FaChevronDown className={`dropdown-icon ${openDropdown === "skills" ? "rotate" : ""}`} />
            </div>
            {openDropdown === "skills" && (
              <ul className="dropdown-menu">
                <li
                  className={active === "add-skills" ? "active-link" : ""}
                  onClick={() => handleMenuItemClick("add-skills")}
                >
                  Add New Skill
                </li>
                <li
                  className={active === "view-skills" ? "active-link" : ""}
                  onClick={() => handleMenuItemClick("view-skills")}
                >
                  View All Skills
                </li>
              </ul>
            )}
          </li>

          {/* Certifications Dropdown */}
          <li className="dropdown-container">
            <div 
              className="dropdown-header"
              onClick={() => handleDropdownToggle("certification")}
            >
              Certifications <FaChevronDown className={`dropdown-icon ${openDropdown === "certification" ? "rotate" : ""}`} />
            </div>
            {openDropdown === "certification" && (
              <ul className="dropdown-menu">
                <li
                  className={active === "add-certificates" ? "active-link" : ""}
                  onClick={() => handleMenuItemClick("add-certificates")}
                >
                  Add New Certification
                </li>
                <li
                  className={active === "view-certifications" ? "active-link" : ""}
                  onClick={() => handleMenuItemClick("view-certifications")}
                >
                  View All Certifications
                </li>
              </ul>
            )}
          </li>

          <li
            className={active === "view-messages" ? "active-link" : ""}
            onClick={() => handleMenuItemClick("view-messages")}
          >
            Messages
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="admin-right">
        {/* Notification */}
        <div className="icon">
          <FaBell onClick={() => handleMenuItemClick("view-messages")} />
          <span className="badge">{unreadCount}</span>
        </div>

        {/* Profile */}
        <div className="profile" onClick={() => setOpen(!open)}>
          <FaUserCircle size={28} />
          {open && (
            <div className="dropdown">
              <p onClick={() => handleMenuItemClick("my-profile")}>My Profile</p>
              <p onClick={() => handleMenuItemClick("update-profile")}>Update Profile</p>
              <p onClick={() => handleMenuItemClick("change-password")}>Change Password</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;