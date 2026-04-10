import { useEffect, useState } from "react";
import "./ViewPages.css";

function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    imageUrl: ""
  });

  const API_BASE_URL = "https://portfolio-production-9608.up.railway.app/api";

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/projects`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please check if backend server is running.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete project - IMPROVED VERSION
  const handleDelete = async (id) => {
    console.log("Attempting to delete project with ID:", id);
    
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone!")) {
      try {
        setError("");
        
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });
        
        console.log("Delete response status:", response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log("Delete response:", result);
          alert("Project deleted successfully.");
          // Remove the deleted project from state
          setProjects(projects.filter(project => project.id !== id));
        } else if (response.status === 404) {
          const errorData = await response.json();
          alert(`Project not found: ${errorData.error || 'Project does not exist'}`);
        } else {
          const errorData = await response.text();
          console.error("Delete error response:", errorData);
          alert(`Failed to delete project. Status: ${response.status}\n${errorData}`);
        }
      } catch (error) {
        console.error("Network error during delete:", error);
        alert("Network error. Please check:\n- Backend server is running on port 8080\n- Check console for more details");
        setError("Network error. Please check if backend is running on port 8080");
      }
    }
  };

  // Open edit modal
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
      imageUrl: project.imageUrl
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

  // Update project
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await fetch(`${API_BASE_URL}/projects/${editingProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert("Project updated successfully.");
        setShowModal(false);
        fetchProjects(); // Refresh the list
        setEditingProject(null);
      } else {
        const errorData = await response.text();
        alert(`Failed to update project: ${errorData}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Network error. Please check your connection.");
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  if (error) {
    return (
      <div className="view-container">
        <h2>Project Management</h2>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchProjects} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="view-container">
        <h2>Project Management</h2>
        <div className="empty-state">
          <p>No projects found. Click "Add New Project" to create one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-container">
      <h2>Project Management</h2>
      
      <div className="view-grid">
        {projects.map(project => (
          <div className="view-card" key={project.id}>
            <img src={project.imageUrl} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description.substring(0, 100)}...</p>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEdit(project)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(project.id)}>
                Delete
              </button>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="view-btn">
                View
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Project</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="githubLink"
                placeholder="GitHub Link"
                value={formData.githubLink}
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
                <button type="submit" className="update-btn">Update Project</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProjects;