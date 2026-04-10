import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const aboutRef = useRef(null);
  const API_BASE_URL = "http://localhost:8080";

  const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
    if (imageUrl.startsWith("/")) return `${API_BASE_URL}${imageUrl}`;
    return `${API_BASE_URL}/${imageUrl}`;
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/about")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load About");
        return res.json();
      })
      .then((payload) => {
        const aboutData = Array.isArray(payload)
          ? [...payload]
              .sort((a, b) => (b.id || 0) - (a.id || 0))
              .find((item) => item?.imageUrl) || payload[payload.length - 1]
          : payload;
        if (!aboutData) throw new Error("No about data found");
        setData({
          ...aboutData,
          imageUrl: resolveImageUrl(aboutData.imageUrl),
        });
      })
      .catch((err) => {
        console.error("About fetch error:", err);
        setLoadError(true);
      });
  }, []);

  if (loadError) {
    return <section className="about" id="about">Unable to load About section.</section>;
  }

  if (!data) {
    return <section className="about" id="about">Loading...</section>;
  }

  return (
    <section className="about" id="about" ref={aboutRef}>
      <div className="about-container">
        <div className="about-image">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.name || "About"}
              onError={(e) => {
                console.error("About image failed:", e.target.src);
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div className="about-content">
          <h2>{data.name}</h2>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
          <Link to="/more-about" className="btn">
            View Full Profile
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;