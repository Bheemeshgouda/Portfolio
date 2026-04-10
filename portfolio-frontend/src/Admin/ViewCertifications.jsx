import { useEffect, useState } from "react";
import "./ViewPages.css";

function ViewCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCert, setEditingCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: ""
  });

  // Fetch certifications
  const fetchCertifications = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/certificates");
      
      if (!response.ok) {
        throw new Error("Failed to fetch certificates");
      }

      const data = await response.json();
      setCertifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  // Delete certification
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/certificates/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          alert("Certificate deleted successfully.");
          fetchCertifications();
        } else {
          alert("Failed to delete certificate.");
        }
      } catch (error) {
        console.error("Error deleting certificate:", error);
        alert("Network error.");
      }
    }
  };

  // Open edit modal
  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      imageUrl: cert.imageUrl || ""
    });
    setShowModal(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Update certificate
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/certificates/${editingCert.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert("Certificate updated successfully.");
        setShowModal(false);
        fetchCertifications();
        setEditingCert(null);
      } else {
        alert("Failed to update certificate.");
      }
    } catch (error) {
      console.error("Error updating certificate:", error);
      alert("Network error.");
    }
  };

  if (loading) return <div className="loading">Loading certificates...</div>;

  if (certifications.length === 0) {
    return (
      <div className="view-container">
        <h2>Certifications Management</h2>
        <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>
          No certificates added yet. Add one from the "Add Certificate" section.
        </p>
      </div>
    );
  }

  return (
    <div className="view-container">
      <h2>Certifications Management</h2>
      
      <div className="view-grid">
        {certifications.map(cert => (
          <div className="view-card" key={cert.id}>
            {cert.imageUrl && <img src={cert.imageUrl} alt={cert.name} />}
            <h3>{cert.name}</h3>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(cert)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(cert.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Certificate</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                placeholder="Certificate Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Certificate Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
              <div className="modal-actions">
                <button type="submit" className="update-btn">Update Certificate</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCertifications;