import { useEffect, useState } from "react";
import "./ViewPages.css";

function ViewSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: ""
  });

  const API_BASE_URL = "https://portfolio-production-9608.up.railway.app/api";

  // Fetch skills
  const fetchSkills = async () => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/skills`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSkills(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Failed to load skills. Please check if backend server is running.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Delete skill
  const handleDelete = async (id) => {
    console.log("Attempting to delete skill with ID:", id);
    
    if (window.confirm("Are you sure you want to delete this skill? This action cannot be undone!")) {
      try {
        setError("");
        
        const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        console.log("Delete response status:", response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log("Delete response:", result);
          alert("Skill deleted successfully.");
          // Remove the deleted skill from state
          setSkills(skills.filter(skill => skill.id !== id));
        } else if (response.status === 404) {
          alert("Skill not found.");
        } else {
          const errorData = await response.text();
          console.error("Delete error response:", errorData);
          alert(`Failed to delete skill. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Network error during delete:", error);
        alert("Network error. Please check:\n- Backend server is reachable at the deployed URL\n- Skills DELETE endpoint exists\n- Check console for more details");
        setError("Network error. Please check if backend is reachable at the deployed URL");
      }
    }
  };

  // Open edit modal
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      imageUrl: skill.imageUrl
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

  // Update skill
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/skills/${editingSkill.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert("Skill updated successfully.");
        setShowModal(false);
        fetchSkills(); // Refresh the list
        setEditingSkill(null);
      } else {
        const errorData = await response.text();
        alert(`Failed to update skill: ${errorData}`);
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      alert("Network error. Please check your connection.");
    }
  };

  if (loading) return <div className="loading">Loading skills...</div>;

  if (error) {
    return (
      <div className="view-container">
        <h2>Skills Management</h2>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchSkills} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="view-container">
        <h2>Skills Management</h2>
        <div className="empty-state">
          <p>No skills found. Click "Add New Skill" to create one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-container">
      <h2>Skills Management</h2>
      
      <div className="view-grid">
        {skills.map(skill => (
          <div className="view-card" key={skill.id}>
            <img src={skill.imageUrl} alt={skill.name} />
            <h3>{skill.name}</h3>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(skill)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(skill.id)}>
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
            <h3>Edit Skill</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                placeholder="Skill Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="update-btn">Update Skill</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSkills;