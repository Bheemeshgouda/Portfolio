import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  return (
    <section className="services" id="services">
      <h2>Professional Overview</h2>

      <div className="service-container">

        {/* SKILLS */}
        <div className="card">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2721/2721269.png" 
            alt="skills"
          />
          <h3>Skills</h3>
          <p>Explore my technical skills and technologies I work with.</p>
          <button onClick={() => navigate("/skills")}>
            View Skills
          </button>
        </div>

        {/* PROJECTS */}
        <div className="card">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2721/2721297.png" 
            alt="projects"
          />
          <h3>Projects</h3>
          <p>Check out my real-world projects and applications.</p>
          <button onClick={() => navigate("/projects")}>
            View Projects
          </button>
        </div>

        {/* CERTIFICATES */}
        <div className="card">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
            alt="certificates"
          />
          <h3>Certificates</h3>
          <p>See my certifications and achievements.</p>
          <button onClick={() => navigate("/certificates")}>
            View Certificates
          </button>
        </div>

      </div>
    </section>
  );
}

export default Services;