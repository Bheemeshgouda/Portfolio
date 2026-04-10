import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import EditAbout from "./EditAbout";
import AddProject from "./AddProject";
import AddSkills from "./AddSkills";
import AddCertificates from "./AddCertificates";
import ViewProjects from "./ViewProjects";
import ViewSkills from "./ViewSkills";
import ViewCertifications from "./ViewCertifications";
import ViewMessages from "./ViewMessages";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [unreadCount, setUnreadCount] = useState(0);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const adminId = adminUser?.id;
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("https://portfolio-production-9608.up.railway.app/api/messages/unread-count");
        if (!response.ok) return;
        const data = await response.json();
        setUnreadCount(data.count || 0);
      } catch (error) {
        // ignore notification fetch failure in UI
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (active === "my-profile" || active === "update-profile") {
      fetchProfile();
    }
  }, [active]);

  const fetchProfile = async () => {
    if (!adminId) return;
    setProfileLoading(true);
    try {
      const response = await fetch(`https://portfolio-production-9608.up.railway.app/api/admin/auth/profile/${adminId}`);
      if (!response.ok) return;
      const data = await response.json();
      const normalized = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      };
      setProfile(normalized);
      localStorage.setItem("adminUser", JSON.stringify({
        id: data.id,
        name: normalized.name,
        email: normalized.email,
        phone: normalized.phone,
      }));
    } catch (error) {
      // Keep UI usable even if profile fetch fails
    } finally {
      setProfileLoading(false);
    }
  };

  const saveProfile = async (nextProfile) => {
    if (!adminId) return;
    const response = await fetch(`https://portfolio-production-9608.up.railway.app/api/admin/auth/profile/${adminId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextProfile),
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Failed to update profile");
    }
    const data = await response.json();
    const normalized = {
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
    };
    setProfile(normalized);
    localStorage.setItem("adminUser", JSON.stringify({
      id: data.id,
      name: normalized.name,
      email: normalized.email,
      phone: normalized.phone,
    }));
  };
  const dashboardCards = [
    {
      title: "Messages",
      description: "View contact form submissions and mark unread messages.",
      actionLabel: "Open Inbox",
      actionKey: "view-messages",
    },
    {
      title: "About Section",
      description: "Update profile image, intro, and resume content.",
      actionLabel: "Edit About",
      actionKey: "edit-about",
    },
    {
      title: "Projects",
      description: "Add portfolio projects and manage existing entries.",
      actionLabel: "Manage Projects",
      actionKey: "view-projects",
    },
    {
      title: "Skills",
      description: "Add new skills and keep your stack up to date.",
      actionLabel: "Manage Skills",
      actionKey: "view-skills",
    },
    {
      title: "Certificates",
      description: "Upload achievements and edit certificate details.",
      actionLabel: "Manage Certificates",
      actionKey: "view-certifications",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <AdminNavbar setActive={setActive} active={active} unreadCount={unreadCount} />
      <main className="admin-dashboard-content">
        {active === "dashboard" && (
          <div className="dashboard-home">
            <section className="dashboard-welcome">
              <h2>Admin Control Center</h2>
              <p>Manage portfolio content with a responsive control panel.</p>
            </section>

            <section className="dashboard-stats">
              <div className="dashboard-stat-card">
                <h4>Modules</h4>
                <strong>4</strong>
                <span>About, Projects, Skills, Certificates</span>
              </div>
              <div className="dashboard-stat-card">
                <h4>Quick Access</h4>
                <strong>1 Click</strong>
                <span>Jump directly into content management</span>
              </div>
              <div className="dashboard-stat-card">
                <h4>UI Mode</h4>
                <strong>Responsive</strong>
                <span>Optimized for desktop, tablet, and mobile</span>
              </div>
            </section>

            <section className="dashboard-grid">
              {dashboardCards.map((card) => (
                <article className="dashboard-module-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button
                    type="button"
                    className="dashboard-action-btn"
                    onClick={() => setActive(card.actionKey)}
                  >
                    {card.actionLabel}
                  </button>
                </article>
              ))}
            </section>
          </div>
        )}

        {active === "edit-about" && <EditAbout />}
        
        {/* Project Sections */}
        {active === "add-project" && <AddProject />}
        {active === "view-projects" && <ViewProjects />}
        
        {/* Skills Sections */}
        {active === "add-skills" && <AddSkills />}
        {active === "view-skills" && <ViewSkills />}
        
        {/* Certifications Sections */}
        {active === "add-certificates" && <AddCertificates />}
        {active === "view-certifications" && <ViewCertifications />}
        {active === "view-messages" && (
          <ViewMessages onUnreadChange={setUnreadCount} />
        )}
        {active === "my-profile" && (
          <div className="admin-form-shell">
            <h2>Profile Overview</h2>
            <div className="profile-details">
              {profileLoading && <p>Loading latest profile...</p>}
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone || "-"}</p>
            </div>
          </div>
        )}
        {active === "update-profile" && (
          <div className="admin-form-shell">
            <h2>Profile Settings</h2>
            <form
              key={`${profile.name}-${profile.email}-${profile.phone}`}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const nextProfile = {
                  name: String(formData.get("name") || ""),
                  email: String(formData.get("email") || ""),
                  phone: String(formData.get("phone") || ""),
                };
                try {
                  await saveProfile(nextProfile);
                  alert("Profile updated successfully");
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              <input name="name" defaultValue={profile.name} placeholder="Name" required />
              <input name="email" type="email" defaultValue={profile.email} placeholder="Email" required />
              <input name="phone" defaultValue={profile.phone} placeholder="Phone" />
              <button type="submit">Save Profile</button>
            </form>
          </div>
        )}
        {active === "change-password" && (
          <div className="admin-form-shell">
            <h2>Security Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!passwordForm.currentPassword || !passwordForm.newPassword) {
                  alert("Please fill all password fields");
                  return;
                }
                if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                  alert("New password and confirm password do not match");
                  return;
                }
                alert("Password changed successfully");
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
              }}
            >
              <input
                type="password"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
              />
              <button type="submit">Update Password</button>
            </form>
          </div>
        )}
      </main>
      <footer className="admin-panel-footer">
        <p>Admin Panel | Portfolio Management</p>
        <span>{new Date().getFullYear()} Bheemesh Gouda. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default AdminDashboard;