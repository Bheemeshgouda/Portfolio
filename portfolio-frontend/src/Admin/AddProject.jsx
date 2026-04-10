import { useState } from "react";
import "./AddProject.css";

function AddProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: ""
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if backend is reachable first
    try {
      const testResponse = await fetch("https://portfolio-production-9608.up.railway.app/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!testResponse.ok) {
        throw new Error("Backend server is not responding");
      }
    } catch (testError) {
      setError(`Cannot connect to backend server at https://portfolio-production-9608.up.railway.app
  
Please check:
1. Is your backend deployed and reachable?
2. Verify the backend URL is correct
3. Check the backend console for errors
4. Try restarting the backend server`);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("githubLink", form.githubLink);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      const response = await fetch("https://portfolio-production-9608.up.railway.app/api/projects/upload", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        alert("Project added successfully.");
        setForm({ title: "", description: "", githubLink: "" });
        setImage(null);
        setVideo(null);
        setImagePreview(null);
        setVideoPreview(null);
      } else {
        const errorText = await response.text();
        setError(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`Network error: ${error.message}
      
Please verify:
- Backend server is reachable at the deployed URL
- No firewall is blocking the connection
- The endpoint '/api/projects/upload' exists
- Check backend console for stack trace`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-page">
      <div className="admin-card">
        <h2>Create Project Entry</h2>

        {error && (
          <div className="error-message" style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1rem',
            whiteSpace: 'pre-line',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          
          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          
          <input
            name="githubLink"
            placeholder="GitHub Repository Link"
            value={form.githubLink}
            onChange={handleChange}
            required
          />

          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <label>Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
          />
          {videoPreview && (
            <div className="preview">
              <video controls>
                <source src={videoPreview} />
              </video>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </form>

        {/* Debug Information */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
          <h4 style={{ color: '#f5f5f5', marginBottom: '0.5rem' }}>Connection Details</h4>
          <p style={{ fontSize: '0.8rem', color: '#cfcfcf' }}>
            Backend URL: <strong>https://portfolio-production-9608.up.railway.app</strong><br/>
            Endpoint: <strong>/api/projects/upload</strong><br/>
            Status: {loading ? 'Connecting...' : 'Ready'}<br/>
            Tip: Make sure your Spring Boot backend is reachable at the deployed host
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddProject;