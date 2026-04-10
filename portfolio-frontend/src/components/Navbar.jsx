import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const goToSection = (sectionId) => {
    closeMenu();

    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", sectionId);
      navigate("/");
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>Bheemesh Gouda</span>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        
        {/* React Route */}
        <li>
          <RouterLink
            to="/"
            onClick={(e) => {
              closeMenu();
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            Home
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              goToSection("about");
            }}
          >
            About
          </RouterLink>
        </li>

        {/* <li onClick={closeMenu}>
          <ScrollLink to="projects" smooth={true} duration={500}>
            Projects
          </ScrollLink>
        </li>

        <li onClick={closeMenu}>
          <RouterLink to="/certificates">Certificates</RouterLink>
        </li> */}

        <li>
          <RouterLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              goToSection("services");
            }}
          >
            Services
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              goToSection("contact");
            }}
          >
            Contact
          </RouterLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;