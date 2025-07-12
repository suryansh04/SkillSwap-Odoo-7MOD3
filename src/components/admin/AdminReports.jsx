import React, { useState } from "react";
import { Download, CheckCircle } from "lucide-react";

const reports = [
  { name: "User Activity", file: "user-activity.csv" },
  { name: "Feedback Logs", file: "feedback-logs.csv" },
  { name: "Swap Stats", file: "swap-stats.csv" },
];

const AdminReports = () => {
  const [downloaded, setDownloaded] = useState("");
  const handleDownload = (file, name) => {
    setDownloaded(name);
    setTimeout(() => setDownloaded(""), 2000);
    // For now, just simulate download
    alert(`Downloading ${file}`);
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
          Reports
        </h3>
        <p style={{ color: "#64748b", fontSize: "1rem" }}>
          Download user activity, feedback logs, and swap stats.
        </p>
      </div>
      <div className="card-content" style={{ padding: "2rem 0 0 0" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 400,
          }}
        >
          {reports.map((report) => (
            <button
              key={report.file}
              onClick={() => handleDownload(report.file, report.name)}
              className="main-cta-btn"
              style={{
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
              <Download size={18} /> Download {report.name}
            </button>
          ))}
          {downloaded && (
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
              <CheckCircle size={18} /> {downloaded} downloaded!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
