import { useEffect, useState } from "react";
import "./ViewPages.css";

function ViewMessages({ onUnreadChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      setError("");
      const response = await fetch("https://portfolio-production-9608.up.railway.app/api/messages");
      if (!response.ok) throw new Error("Failed to load messages");
      const data = await response.json();
      setMessages(data);
      const unreadCount = data.filter((item) => !item.read).length;
      onUnreadChange?.(unreadCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`https://portfolio-production-9608.up.railway.app/api/messages/${id}/read`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to mark message as read");
      fetchMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch("https://portfolio-production-9608.up.railway.app/api/messages/read-all", {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to mark all as read");
      fetchMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="view-container">
      <h2>Message Center</h2>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchMessages}>Retry</button>
        </div>
      )}

      <div className="message-toolbar">
        <button className="update-btn" onClick={markAllAsRead}>Mark All As Read</button>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="message-grid">
          {messages.map((item) => (
            <div className={`message-card ${item.read ? "read" : "unread"}`} key={item.id}>
              <div className="message-head">
                <h3>{item.name}</h3>
                <span>{item.email}</span>
              </div>
              <p>{item.message}</p>
              <div className="message-footer">
                <small>
                  {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Unknown date"}
                </small>
                {!item.read && (
                  <button className="edit-btn" onClick={() => markAsRead(item.id)}>
                    Mark As Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMessages;
