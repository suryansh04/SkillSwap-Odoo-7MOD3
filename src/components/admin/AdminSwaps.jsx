import React from "react";
import { Eye } from "lucide-react";

const mockSwaps = [
  {
    id: 1,
    from: "Alice",
    to: "Bob",
    skill: "Figma for React",
    status: "pending",
  },
  {
    id: 2,
    from: "Carol",
    to: "John",
    skill: "Python for UX Design",
    status: "accepted",
  },
  {
    id: 3,
    from: "Dave",
    to: "Alice",
    skill: "Java for Photoshop",
    status: "cancelled",
  },
];

const statusColors = {
  pending: { background: "#fbbf24", color: "#1e293b" },
  accepted: { background: "#34d399", color: "white" },
  cancelled: { background: "#f87171", color: "white" },
};

const AdminSwaps = () => {
  return (
    <div>
      <div className="card-header">
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1e293b",
            marginBottom: "0.5rem",
          }}
        >
          Swap Requests
        </h3>
        <p style={{ color: "#64748b", fontSize: "1rem" }}>
          Monitor all swap requests and their statuses.
        </p>
      </div>
      <div className="card-content" style={{ padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}
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
                  From
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  To
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Skill
                </th>
                <th
                  style={{
                    padding: "0.75rem",
                    textAlign: "left",
                    color: "#1e293b",
                    fontWeight: 600,
                  }}
                >
                  Status
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
              {mockSwaps.map((swap) => (
                <tr
                  key={swap.id}
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
                    {swap.from}
                  </td>
                  <td style={{ padding: "0.75rem", color: "#64748b" }}>
                    {swap.to}
                  </td>
                  <td style={{ padding: "0.75rem", color: "#334155" }}>
                    {swap.skill}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        ...statusColors[swap.status],
                        borderRadius: 8,
                        padding: "0.25rem 0.75rem",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      {swap.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <button
                      className="main-cta-btn"
                      style={{
                        background: "#1e293b",
                        color: "white",
                        padding: "0.5rem 1rem",
                        fontSize: "0.95rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                      title="View Details"
                    >
                      <Eye size={16} /> View
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

export default AdminSwaps;
