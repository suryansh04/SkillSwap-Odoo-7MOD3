import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="main-card"
        style={{
          padding: "2.5rem 2rem",
          borderRadius: "2rem",
          boxShadow: "0 20px 40px -5px rgba(30,41,59,0.13)",
          minWidth: 340,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          background: "linear-gradient(120deg, #fff 70%, #e2e8f0 100%)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
              boxShadow: "0 4px 16px 0 rgba(30,41,59,0.10)",
            }}
          >
            <Lock size={36} style={{ color: "white" }} />
          </div>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
              letterSpacing: "-1px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Admin Login
          </h2>
        </div>
        <input
          type="password"
          placeholder="Enter the password"
          className="main-cta-btn"
          style={{
            width: "100%",
            background: "#f1f5f9",
            color: "#1e293b",
            border: "1.5px solid #e2e8f0",
            borderRadius: 16,
            padding: "1.1rem",
            fontSize: "1.15rem",
            marginBottom: 8,
            boxShadow: "0 2px 8px 0 rgba(30,41,59,0.04)",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            outline: "none",
            transition: "border 0.2s",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => (e.target.style.border = "1.5px solid #1e293b")}
          onBlur={(e) => (e.target.style.border = "1.5px solid #e2e8f0")}
        />
        {error && (
          <div
            style={{
              color: "#f87171",
              fontWeight: 600,
              fontSize: "1rem",
              marginBottom: 8,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          className="main-cta-btn"
          style={{
            width: "100%",
            background: "#1e293b",
            color: "white",
            fontWeight: 700,
            fontSize: "1.15rem",
            borderRadius: 16,
            padding: "1.1rem",
            marginTop: 8,
            boxShadow: "0 4px 14px 0 rgba(30,41,59,0.08)",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.5px",
            transition: "background 0.2s, transform 0.2s",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#334155";
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#1e293b";
            e.currentTarget.style.transform = "none";
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
