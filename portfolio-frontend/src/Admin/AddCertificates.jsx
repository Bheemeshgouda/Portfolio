import { useState } from "react";

function AddCertificates() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter certificate name");
      return;
    }

    if (!image) {
      alert("Upload certificate image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/api/certificates/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to add certificate");
      }

      await response.json();
      alert("Certificate added successfully.");
      
      setName("");
      setImage(null);
      const fileInput = document.querySelector("input[type='file']");
      if (fileInput) fileInput.value = "";
      
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding certificate: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-shell">
      <h2>Create Certification Entry</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Certificate Name"
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
          {loading ? "Adding..." : "Add Certificate"}
        </button>
      </form>
    </div>
  );
}

export default AddCertificates;