import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { apiUrl, resolveImageUrl } from "../config";
import "./About.css";

function About() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    fetch(apiUrl("/api/about"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load About");
        return res.json();
      })
      .then((payload) => {
        if (!payload || (Array.isArray(payload) && payload.length === 0)) {
          setData({
            name: "About",
            title: "",
            description: "",
            imageUrl: "",
          });
          return;
        }

        const items = Array.isArray(payload) ? payload : [payload];
        const aboutData = [...items]
              .sort((a, b) => (b.id || 0) - (a.id || 0))
              .find((item) => item?.imageUrl) || items[items.length - 1];

        if (!aboutData) {
          setData({
            name: "About",
            title: "",
            description: "",
            imageUrl: "",
          });
          return;
        }

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
