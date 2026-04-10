import { useState } from "react";

function EditAbout() {
  const [form, setForm] = useState({ name: "", title: "", description: "" });
  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Upload profile image");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", image);
    if (resume) formData.append("resume", resume);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/about/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Upload failed");
      }

      alert("About updated successfully");
    } catch (error) {
      console.error(error);
      alert("Upload error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-shell">
      <h2>About Section Settings</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Save Changes"}</button>
      </form>
    </div>
  );
}

export default EditAbout;