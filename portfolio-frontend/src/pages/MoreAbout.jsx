import { useNavigate } from "react-router-dom";
import "./MoreAbout.css";

function MoreAbout() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    sessionStorage.setItem("scrollToAbout", "true");
    navigate("/");
  };

  const education = [
    {
      degree: "Master of Computer Application (MCA)",
      college: "Visvesvaraya Technological University, Belgaum, Karnataka",
      duration: "2024 - 2025",
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      college: "AME's College, Raichur, Karnataka",
      duration: "2020 - 2023",
    },
  ];

  const experience = [
    {
      role: "Software Development Intern",
      company: "TechVritti",
      duration: "Nov 2024 - Jan 2025",
      points: [
        "Contributed to the Kadaknath Poultry E-Commerce platform using PHP, MySQL, and XAMPP.",
        "Owned both frontend and backend modules with smooth integration and data flow.",
        "Worked with the core team during MSME event planning and execution.",
      ],
    },
  ];

  const strengths = [
    "Full stack development with Java, Spring Boot, Python, Flask, PHP, and MySQL.",
    "Practical knowledge of REST APIs, backend logic, and responsive frontend interfaces.",
    "Data analytics exposure with Pandas, NumPy, and Matplotlib.",
  ];

  return (
    <section className="more-about-page">
      <div className="more-about-wrapper">
        <header className="more-about-hero">
          <p className="more-about-kicker">ABOUT ME</p>
          <h2 className="more-about-title">Professional Journey</h2>
          <p className="more-about-intro">
            I focus on building reliable full stack applications with clean user experience,
            strong backend design, and practical solutions for real-world needs.
          </p>
        </header>

        <section className="more-about-summary-strip">
          <article className="summary-item">
            <h4>Experience</h4>
            <p>Software Development Intern at TechVritti</p>
          </article>
          <article className="summary-item">
            <h4>Education</h4>
            <p>MCA and BCA background in computer applications</p>
          </article>
          <article className="summary-item">
            <h4>Focus</h4>
            <p>Full stack web development and API-driven systems</p>
          </article>
        </section>

        <section className="more-about-grid">
          <div className="more-about-section timeline-section" style={{ "--delay": "0.08s" }}>
            <h3>Education Background</h3>
            {education.map((item) => (
              <div key={item.degree} className="more-about-card timeline-item">
                <span className="timeline-dot"></span>
                <h4>{item.degree}</h4>
                <p>{item.college}</p>
                <span className="meta">{item.duration}</span>
              </div>
            ))}
          </div>

          <div className="more-about-section timeline-section" style={{ "--delay": "0.16s" }}>
            <h3>Work Experience</h3>
            {experience.map((item) => (
              <div key={item.role} className="more-about-card timeline-item">
                <span className="timeline-dot"></span>
                <h4>
                  {item.role} | {item.company}
                </h4>
                <span className="meta">{item.duration}</span>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="more-about-section highlights-section" style={{ "--delay": "0.24s" }}>
          <h3>What I Bring</h3>
          <div className="highlights-grid">
            {strengths.map((item) => (
              <article key={item} className="highlight-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>

        <button type="button" className="btn more-about-back-btn" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </section>
  );
}

export default MoreAbout;
