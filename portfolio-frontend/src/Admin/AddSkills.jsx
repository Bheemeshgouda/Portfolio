import { useState } from "react";

function AddSkills() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a skill name");
      return;
    }

    if (!image) {
      alert("Please upload an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/api/skills/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      await response.json();
      alert("Skill added successfully.");
      
      setName("");
      setImage(null);
      const fileInput = document.querySelector("input[type='file']");
      if (fileInput) fileInput.value = "";
      
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding skill:\n" + err.message + "\n\nPlease make sure backend is running on localhost:8080.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-shell">
      <h2>Create Skill Entry</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>
    </div>
  );
}

export default AddSkills;