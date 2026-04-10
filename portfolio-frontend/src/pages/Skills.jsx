import { useEffect, useState } from "react";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-production-9608.up.railway.app/api/skills")
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="skills">
        <h2>Technical Skills</h2>
        <div className="loading">Loading skills...</div>
      </section>
    );
  }

  return (
    <section className="skills" id="skills">
      <h2>Technical Skills</h2>

      <div className="skills-container">
        {skills.length > 0 ? (
          skills.map(skill => (
            <div className="skill-card" key={skill.id} data-level="Advanced">
              <img src={skill.imageUrl} alt={skill.name} />
              <h3>{skill.name}</h3>
            </div>
          ))
        ) : (
          <div className="no-skills">No skills to display</div>
        )}
      </div>
    </section>
  );
}

export default Skills;