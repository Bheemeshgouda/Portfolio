import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <h2>Bheemesh Gouda</h2>

      <p>Building modern web applications with focus and quality.</p>

      {/* Social Icons */}
      <div className="social-icons">
        <a href="https://github.com/Bheemeshgouda" target="_blank">
          <FaGithub />
        </a>
        <a href="http://linkedin.com/in/bheemesh-gouda/" target="_blank">
          <FaLinkedin />
        </a>
        <a href="mailto:bheemeshgouda8@gmail.com">
          <FaEnvelope />
        </a>
      </div>

      {/* Copyright */}
      <p className="copy">
        © 2026 Bheemesh Gouda | All Rights Reserved
      </p>

    </footer>
  );
}

export default Footer;