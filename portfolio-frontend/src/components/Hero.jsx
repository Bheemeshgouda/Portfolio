import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaReact, FaJava, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, 
  FaGitAlt, FaGithub, FaDatabase 
} from "react-icons/fa";

import { 
  SiSpringboot, SiMysql, SiJavascript 
} from "react-icons/si";
import "./Hero.css";

function Hero() {
  const roles = ["Full Stack Developer", "Java Developer", "Software Engineer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    if (charIndex < roles[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + roles[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index, roles]);

  // Particle effect
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDuration = Math.random() * 5 + 5 + "s";
      particle.style.animationDelay = Math.random() * 5 + "s";
      hero.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 8000);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

       {/* Floating Tech Icons */}
  <div className="floating-icons">
    <FaReact />
    <FaJava />
    <FaPython />
    <FaHtml5 />
    <FaCss3Alt />
    <FaNodeJs />
    <SiJavascript />
    <SiSpringboot />
    <SiMysql />
    <FaGitAlt />
    <FaGithub />
    <FaDatabase />
  </div>

  {/* Existing content */}
  <div className="hero-content"></div>



      {/* Grid Background */}
      <div className="hero-grid"></div>

      <div className="hero-content">
        <h1 className="fade-in">
          Hi, I'm <span>Bheemesh Gouda</span>
        </h1>

        <h2 className="typing">{text}|</h2>

        <p className="fade-in delay">
          I build modern web applications using React, Spring Boot, and Java.
        </p>

        <div className="hero-buttons fade-in delay2">
          <Link to="/projects" className="btn primary">
            View Projects
          </Link>
          <a href="#contact" className="btn secondary">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;