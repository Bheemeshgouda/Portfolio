import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Certificates.css";

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const lastTapRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/certificates")
      .then(res => res.json())
      .then(data => setCerts(data));
  }, []);

  const handleTouchEnd = (cert) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setSelectedCert(cert);
    }
    lastTapRef.current = now;
  };

  return (
    <section className="certificates">
      <h2>Certifications</h2>

      <div className="cert-container">
        {certs.map(cert => (
          <div
            className="cert-card"
            key={cert.id}
            onDoubleClick={() => setSelectedCert(cert)}
            onTouchEnd={() => handleTouchEnd(cert)}
          >
            <img src={cert.imageUrl} alt={cert.name} />
            <h3>{cert.name}</h3>
          </div>
        ))}
      </div>

      <button type="button" className="cert-back-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>

      {selectedCert && (
        <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
            >
              Close
            </button>
            <img src={selectedCert.imageUrl} alt={selectedCert.name} />
            <h3>{selectedCert.name}</h3>
          </div>
        </div>
      )}
    </section>
  );
}

export default Certificates;