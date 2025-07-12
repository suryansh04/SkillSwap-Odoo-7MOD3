import React from "react";
import { Ban, ThumbsDown } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    skillsOffered: ["Figma", "UX Design"],
    skillsWanted: ["Python", "Excel"],
    banned: false,
    inappropriate: false,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    skillsOffered: ["Photoshop", "Illustrator"],
    skillsWanted: ["React", "Node.js"],
    banned: false,
    inappropriate: true,
  },
];

const AdminUsers = () => {
  return (
    <div
      className="main-card"
      style={{
        background: "#f8fafc",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px 0 rgba(30,41,59,0.10)",
        padding: "2rem",
        maxWidth: 900,
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
          Users
        </h3>
        <p style={{ color: "#64748b", fontSize: "1rem" }}>
          Manage users, ban accounts, and reject inappropriate skills.
        </p>
      </div>
      <div className="card-content" style={{ padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 16,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px 0 rgba(30,41,59,0.04)",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Skills Offered
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Skills Wanted
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    borderTop: "1px solid #e2e8f0",
                    background: "white",
                  }}
                >
                  <td
                    style={{
                      padding: "0.75rem",
                      color: "#1e293b",
                      fontWeight: 500,
                    }}
                  >
                    {user.name}
                  </td>
                  <td style={{ padding: "0.75rem", color: "#64748b" }}>
                    {user.email}
                  </td>
                  <td style={{ padding: "0.75rem", color: "#334155" }}>
                    {user.skillsOffered.join(", ")}
                  </td>
                  <td style={{ padding: "0.75rem", color: "#334155" }}>
                    {user.skillsWanted.join(", ")}
                  </td>
                  <td style={{ padding: "0.75rem", display: "flex", gap: 8 }}>
                    <button
                      className="main-cta-btn"
                      style={{
                        background: "#f87171",
                        color: "white",
                        padding: "0.5rem 1.2rem",
                        fontSize: "0.95rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px 0 rgba(248,113,113,0.10)",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      title="Ban User"
                    >
                      <Ban size={16} /> Ban
                    </button>
                    <button
                      className="main-cta-btn"
                      style={{
                        background: user.inappropriate ? "#fbbf24" : "#e5e7eb",
                        color: user.inappropriate ? "#1e293b" : "#9ca3af",
                        padding: "0.5rem 1.2rem",
                        fontSize: "0.95rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        borderRadius: 8,
                        boxShadow: "0 2px 8px 0 rgba(251,191,36,0.10)",
                        border: "none",
                        cursor: user.inappropriate ? "pointer" : "not-allowed",
                        transition: "background 0.2s",
                      }}
                      title="Reject Skills"
                      disabled={!user.inappropriate}
                    >
                      <ThumbsDown size={16} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
