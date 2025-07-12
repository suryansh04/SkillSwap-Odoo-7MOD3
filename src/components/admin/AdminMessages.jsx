import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const AdminMessages = () => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setMessage("");
  };

  return (
    <div
      className="main-card"
      style={{
        background: "#f8fafc",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px 0 rgba(30,41,59,0.10)",
        padding: "2rem",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <div
        className="card-header"
        style={{ background: "none", borderBottom: "none", marginBottom: 0 }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1e293b",
            marginBottom: "0.5rem",
          }}
        >
          Platform Message
        </h3>
        <p style={{ color: "#64748b", fontSize: "1rem" }}>
          Send a message to all users on the platform.
        </p>
      </div>
      <div className="card-content" style={{ padding: "2rem 0 0 0" }}>
        <form
          onSubmit={handleSend}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <textarea
            style={{
              width: "100%",
              padding: "1.25rem",
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              fontSize: "1.1rem",
              color: "#1e293b",
              background: "#fff",
              resize: "vertical",
              minHeight: 100,
              boxShadow: "0 2px 8px 0 rgba(30,41,59,0.04)",
            }}
            rows={4}
            placeholder="Type your message to all users..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="main-cta-btn"
            style={{
              width: "fit-content",
              alignSelf: "flex-end",
              background: "#1e293b",
              color: "white",
              fontWeight: 600,
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0.9rem 2rem",
              borderRadius: 12,
              boxShadow: "0 4px 14px 0 rgba(30,41,59,0.08)",
            }}
          >
            <Send size={18} /> Send
          </button>
          {sent && (
            <div
              style={{
                color: "#22c55e",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
              }}
            >
              <CheckCircle size={18} /> Message sent!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminMessages;
