import { useEffect, useState } from "react";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-production-9608.up.railway.app/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <section className="projects" id="projects">
      <h2>Featured Projects</h2>

      <div className="project-container">
        {projects.map((p) => (
          <div className="card" key={p.id}>
            <div className="card-flipper">
              
              {/* FRONT SIDE */}
              <div className="card-front">
                <div className="project-media">
                  {p.videoUrl ? (
                    <video src={p.videoUrl} autoPlay loop muted />
                  ) : (
                    <img src={p.imageUrl} alt={p.title} />
                  )}
                </div>
                <h3>{p.title}</h3>
              </div>

              {/* BACK SIDE */}
              <div className="card-back">
                <div className="back-content">
                  <h3>{p.title}</h3>
                  
                  <div className="description">
                    <p>{p.description}</p>
                  </div>
                  
                  <div className="button-group">
                    <a 
                      href={p.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="github-btn"
                    >
                      GitHub
                    </a>

                    {p.videoUrl && (
                      <a 
                        href={p.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="video-btn"
                      >
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;