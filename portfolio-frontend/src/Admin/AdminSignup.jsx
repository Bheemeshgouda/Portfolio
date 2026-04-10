import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminAuth.css";

function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://portfolio-production-9608.up.railway.app/api/admin/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Sign up failed");
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
      }));
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-auth-page">
      <div className="admin-auth-card">
        <h2>Create Administrator Account</h2>
        <p>Create your admin account.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div className="admin-auth-links">
          <span>Already have account?</span> <Link to="/admin-signin">Sign in</Link>
        </div>
      </div>
    </section>
  );
}

export default AdminSignup;
